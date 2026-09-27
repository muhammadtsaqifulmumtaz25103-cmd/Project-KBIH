import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
        anggotaId: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        profil: {
            id: string;
            nama: string;
            email: string;
            role: string;
            status: import(".prisma/client").$Enums.StatusKeanggotaan;
        };
    }>;
}
