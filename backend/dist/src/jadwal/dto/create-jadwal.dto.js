"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJadwalDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateJadwalDto {
}
exports.CreateJadwalDto = CreateJadwalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-11-10' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateJadwalDto.prototype, "tanggalMulai", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-11-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateJadwalDto.prototype, "tanggalSelesai", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 40 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateJadwalDto.prototype, "kuota", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Aula Balai Pelatihan Haji Jakarta' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJadwalDto.prototype, "lokasi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['id-kegiatan-1', 'id-kegiatan-2'], required: false }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateJadwalDto.prototype, "kegiatanIds", void 0);
//# sourceMappingURL=create-jadwal.dto.js.map