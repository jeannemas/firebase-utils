import type { Prisma, ServiceAccount } from '@prisma/client';

import { prisma } from './prisma';

const baseOrderBy = {
	label: 'desc',
} satisfies Partial<Prisma.ServiceAccountOrderByWithRelationInput>;
const baseSelect = {
	createdAt: true,
	deletedAt: true,
	id: true,
	json: true,
	label: true,
	updatedAt: true,
} satisfies Partial<Prisma.ServiceAccountSelect>;
const baseWhere = {
	deletedAt: null,
} satisfies Partial<Prisma.ServiceAccountWhereInput>;

export async function create(payload: Prisma.ServiceAccountCreateInput): Promise<ServiceAccount> {
	return await prisma.serviceAccount.create({
		data: {
			...payload,
		},
		select: {
			...baseSelect,
		},
	});
}

export async function readAll(): Promise<ServiceAccount[]> {
	return await prisma.serviceAccount.findMany({
		orderBy: {
			...baseOrderBy,
		},
		select: {
			...baseSelect,
		},
		where: {
			...baseWhere,
		},
	});
}

export async function readOne(id: ServiceAccount['id']): Promise<ServiceAccount | null> {
	return await prisma.serviceAccount.findFirst({
		select: {
			...baseSelect,
		},
		where: {
			...baseWhere,
			id,
		},
	});
}
