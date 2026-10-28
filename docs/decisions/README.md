# Architecture Decision Records (ADR)

ADR menyimpan keputusan yang berdampak jangka panjang, alasan, alternatif, dan konsekuensi.

## Kapan membuat ADR
- Pemilihan framework, database, ORM, authentication, hosting, atau provider.
- Batas modul atau perubahan arsitektur.
- Strategi tenancy dan isolasi data.
- Model RBAC/permission.
- Strategi inventory valuation, payment, audit, backup, atau notification.
- Perubahan yang mahal untuk dibalik.

## Penamaan
`ADR-NNN-short-title.md`, misalnya `ADR-001-authentication-provider.md`.

Salin `ADR_TEMPLATE.md`, lalu ubah status dari Proposed ke Accepted hanya setelah keputusan disetujui.

## ADR awal yang disarankan
- ADR-001: Authentication provider.
- ADR-002: Hosting dan managed database.
- ADR-003: Inventory valuation.
- ADR-004: Notification provider.
- ADR-005: Payment, refund, dan finance scope.
