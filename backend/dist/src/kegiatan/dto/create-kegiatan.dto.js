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
exports.CreateKegiatanDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateKegiatanDto {
}
exports.CreateKegiatanDto = CreateKegiatanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'id-kategori-manasik' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateKegiatanDto.prototype, "kategoriId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Praktik Tawaf dan Sa\'i' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateKegiatanDto.prototype, "namaKegiatan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Simulasi praktik tawaf dan sa\'i di area miniatur Ka\'bah balai pelatihan' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateKegiatanDto.prototype, "deskripsi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PRAKTIK' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateKegiatanDto.prototype, "jenis", void 0);
//# sourceMappingURL=create-kegiatan.dto.js.map