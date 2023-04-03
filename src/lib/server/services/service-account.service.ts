import type { Prisma, ServiceAccount } from '@prisma/client';

import { prisma } from './prisma';

// We define the base orderBy, select and where clauses.
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

/**
 * Create a new service account.
 *
 * @param data The data to create the service account with.
 * @returns The created service account.
 */
export function create(data: Prisma.ServiceAccountCreateInput) {
	return prisma.serviceAccount.create({
		data,
		select,
	});
}

/**
 * Read all service accounts.
 *
 * @returns An array of `ServiceAccount`.
 */
export function readAll() {
	return prisma.serviceAccount.findMany({
		orderBy,
		select,
		where,
	});
}

/**
 * Read one service account.
 *
 * @param id The ID of the service account to read.
 * @returns The service account or `null` if it doesn't exist.
 */
export function readOne(id: ServiceAccount['id']) {
	return prisma.serviceAccount.findFirst({
		select,
		where: {
			...where,
			id,
		},
	});
}

/**
 * Update a service account.
 *
 * @param id The ID of the service account to update.
 * @param data The data to update the service account with.
 * @returns The updated service account.
 */
export async function update(id: ServiceAccount['id'], data: Prisma.ServiceAccountUpdateInput) {
	// We do this to ensure the record still exists
	await prisma.serviceAccount.findFirstOrThrow({
		where: {
			...where,
			id,
		},
	});

	return prisma.serviceAccount.update({
		data,
		select,
		where: { id },
	});
}

/**
 * Soft-delete a service account.
 *
 * @param id The ID of the service account to soft-delete.
 * @returns The soft-deleted service account.
 */
export function del(id: ServiceAccount['id']) {
	return update(id, { deletedAt: new Date() });
}
