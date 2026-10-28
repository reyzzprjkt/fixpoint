# Model Entitas Konseptual MVP (Database PostgreSQL)

- **Status:** Konseptual / PROPOSED (Menunggu Persetujuan Skema Final)
- **Prinsip:** Least privilege, audit trail lengkap, integritas referensial foreign key, data isolation.

---

## 1. Daftar Entitas Konseptual MVP

### 1. Entitas Autentikasi & Akun (Better Auth Core + Custom)
- **`users`**
  - Identitas internal: `id`, `name`, `email`, `role` (`OWNER`, `ADMIN`, `KASIR` — enum; MVP hanya Owner & Admin aktif), `emailVerified`, `image`, `createdAt`, `updatedAt`.
  - Aturan: Single role per user. Admin tidak boleh mengedit role ini.
- **`sessions`**
  - Sesi login: `id`, `userId` (FK users), `token`, `expiresAt`, `ipAddress`, `userAgent`, `createdAt`, `updatedAt`.
  - Metadata tambahan (untuk dual-timeout): `loginAt` / `absoluteExpiresAt` (PROPOSED untuk menegakkan batas 8 jam absolut).
- **`two_factor`** (Better Auth 2FA plugin)
  - Data MFA: `id`, `userId` (FK users, unique), `secret` (encrypted), `backupCodes` (hashed/encrypted), `enabled`, `createdAt`, `updatedAt`.
- **`accounts`** (Better Auth credential/OAuth support)
  - Kredensial password hashed: `id`, `userId` (FK users), `accountId`, `providerId` (credential), `password` (hashed argon2/scrypt).

### 2. Entitas Pelanggan & Perangkat Servis
- **`customers`**
  - Data kontak servis: `id`, `name`, `phoneNumber` (E.164 disarankan), `email` (opsional), `address` (opsional), `customerType` (`INDIVIDUAL` / `BUSINESS`), `createdAt`, `updatedAt`.
- **`devices`**
  - Identitas fisik perangkat: `id`, `customerId` (FK customers), `deviceType` (Laptop, PC, Printer, dll.), `brand`, `model`, `serialNumber` (opsional), `createdAt`, `updatedAt`.

### 3. Entitas Tiket & Siklus Hidup Servis
- **`service_tickets`**
  - Entitas utama tiket:
    - `id` (UUID atau CUID internal).
    - `ticketNumber` (string unik ramah manusia, misal: `FP-20261028-001`).
    - `customerId` (FK customers).
    - `deviceId` (FK devices).
    - `reportedFault` (keluhan pelanggan).
    - `initialCondition` (kelengkapan, lecet/kerusakan fisik awal).
    - `assignedUserId` (FK users, opsional — penugasan pelaksana; role pelaksana TBD).
    - `currentStatus` (Enum 9 status: `RECEIVED`, `INSPECTING`, `WAITING_APPROVAL`, `WAITING_PARTS`, `IN_PROGRESS`, `COMPLETED`, `READY_FOR_PICKUP`, `CLOSED`, `CANCELLED`).
    - `estimatedCost` (desimal / integer rupiah, opsional/conditional).
    - `finalCost` (desimal / integer rupiah, opsional/conditional).
    - `customerApprovalStatus` (`PENDING`, `APPROVED`, `REJECTED`, opsional/conditional).
    - `receivedAt` (timestamp wajib).
    - `completedAt` (timestamp conditional).
    - `closedAt` (timestamp conditional).
    - `cancelledAt` (timestamp conditional).
    - `cancellationReason` (teks, conditional jika CANCELLED).
- **`ticket_status_history`**
  - Log audit perubahan status: `id`, `ticketId` (FK service_tickets), `previousStatus`, `newStatus`, `changedByUserId` (FK users, nullable jika sistem), `changeReason` (opsional), `createdAt`.
- **`ticket_diagnostics`**
  - Catatan diagnosis teknis: `id`, `ticketId` (FK service_tickets), `diagnosticNotes`, `recommendedActions`, `estimatedPartsCost`, `estimatedLaborCost`, `diagnosedByUserId` (FK users), `createdAt`.
- **`ticket_parts`** (PROPOSED untuk suku cadang servis)
  - Relasi suku cadang yang dipakai: `id`, `ticketId` (FK service_tickets), `partName`, `partCost`, `quantity`, `addedByUserId` (FK users), `createdAt`.

### 4. Entitas Tracking Publik (Credential Terpisah)
- **`ticket_tracking_tokens`**
  - Kredensial pelacakan publik tanpa login:
    - `id` (UUID).
    - `ticketId` (FK service_tickets, unique).
    - `tokenHash` (SHA-256 / scrypt dari secret token; raw secret token diberikan ke pelanggan di struk/WhatsApp, tidak disimpan raw di DB).
    - `expiresAt` (opsional / disesuaikan siklus tiket).
    - `isRevoked` (boolean).
    - `createdAt`, `updatedAt`.

### 5. Entitas Audit & Keamanan
- **`audit_logs`**
  - Catatan jejak audit sistem (Append-Only):
    - `id` (UUID).
    - `actorUserId` (FK users, nullable jika anonymous tracking).
    - `action` (string, misal: `ticket.create`, `ticket.status_change`, `auth.login_failed`, `user.create`).
    - `targetEntity` (string, misal: `service_tickets`, `users`).
    - `targetId` (string identifier entitas target).
    - `metadata` (JSONB — perubahan aman tanpa secret/data sensitif).
    - `ipAddress` (string).
    - `userAgent` (string).
    - `timestamp` (default `now()`).
  - Aturan keamanan: Larang UPDATE dan DELETE pada tabel ini di level policy PostgreSQL / triggers.

---

## 2. Status Entitas

- **Disetujui Arsitektur:** `users`, `sessions`, `two_factor`, `service_tickets`, `ticket_status_history`, `audit_logs`, `ticket_tracking_tokens`.
- **PROPOSED / TBD:** `ticket_parts` (komponen sparepart tiket servis), skema presisi nomor tiket (`ticketNumber`), dan detail format token tracking hash.
