import type { Prisma, ServiceAccount } from '@prisma/client';

import { prisma } from './prisma';

const orderBy = {
	label: 'desc',
} satisfies Prisma.ServiceAccountOrderByWithRelationInput;
const select = {
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
	id: true,
	json: true,
	label: true,
} satisfies Prisma.ServiceAccountSelect;
const where = {
	deletedAt: null,
} satisfies Prisma.ServiceAccountWhereInput;

export async function create(data: Prisma.ServiceAccountCreateInput) {
	return await prisma.serviceAccount.create({
		data,
		select,
	});
}

export async function readAll() {
	return await prisma.serviceAccount.findMany({
		orderBy,
		select,
		where,
	});
}

export async function readOne(id: ServiceAccount['id']) {
	return await prisma.serviceAccount.findFirst({
		select,
		where: {
			...where,
			id,
		},
	});
}
