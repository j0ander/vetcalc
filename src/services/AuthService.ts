import { db, type User } from '@/database/VetCalcDB';
import { premiumService } from './PremiumService';

class AuthService {
    private currentUser: User | null = null;

    constructor() {
        const savedUser = localStorage.getItem('vetcalc_current_user');
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser) as User;
                this.currentUser = user;
                premiumService.setStatus(user.isPremium);
            } catch (e) { }
        }
    }

    async register(email: string, password: string, name: string): Promise<{ success: boolean; message: string }> {
        const existing = await db.users.where('email').equals(email).first();
        if (existing) return { success: false, message: 'El email ya está registrado' };
        const newUser: User = { email, password, isPremium: false, name, createdAt: new Date() };
        await db.users.add(newUser);
        return { success: true, message: 'Registro exitoso' };
    }

    async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
        const user = await db.users.where('email').equals(email).first();
        if (!user || user.password !== password) return { success: false, message: 'Credenciales incorrectas' };
        this.currentUser = user;
        localStorage.setItem('vetcalc_current_user', JSON.stringify(user));
        premiumService.setStatus(user.isPremium);
        return { success: true, message: 'Login exitoso' };
    }

    logout(): void {
        this.currentUser = null;
        localStorage.removeItem('vetcalc_current_user');
        premiumService.setStatus(false);
    }

    isLoggedIn(): boolean {
        return this.currentUser !== null;
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }

    async upgradeToPremium(): Promise<void> {
        if (!this.currentUser || !this.currentUser.id) return;
        this.currentUser.isPremium = true;
        await db.users.update(this.currentUser.id, { isPremium: true });
        localStorage.setItem('vetcalc_current_user', JSON.stringify(this.currentUser));
        premiumService.setStatus(true);
    }
}

export const authService = new AuthService();