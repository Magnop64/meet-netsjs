import { SetMetadata } from "@nestjs/common";

export const KEY_PUBLIC = 'isPublic';
export const isPublic = () => SetMetadata(KEY_PUBLIC, true);