import { CategoryType } from '../types';

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {};

export const categoryMapping: Record<CategoryType, string> = {
	[CategoryType.Other]: 'card__category_other',
	[CategoryType.SoftSkill]: 'card__category_soft',
	[CategoryType.Additional]: 'card__category_additional',
	[CategoryType.Button]: 'card__category_button',
	[CategoryType.HardSkill]: 'card__category_hard',
};
