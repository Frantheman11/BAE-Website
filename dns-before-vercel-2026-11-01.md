# basicamericanenterprises.com DNS at GoDaddy, before the move to Vercel (2026-11-01)

Copied from GoDaddy DNS Management (25 records) and public DNS, before any change.
Use it to put a record back if something stops working.

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | 72.167.58.141 (old GoDaddy hosting) | 10800 s |
| A | admin | 72.167.58.141 | 10800 s |
| A | mail | 72.167.58.141 | 10800 s |
| NS | @ | ns53.domaincontrol.com. | 1 h |
| NS | @ | ns54.domaincontrol.com. | 1 h |
| CNAME | autodiscover | autodiscover.outlook.com. | 1 h |
| CNAME | cpanel | sucuriip.basicamericanenterprises.com. | 10800 s |
| CNAME | email | email.secureserver.net. | 1 h |
| CNAME | lyncdiscover | webdir.online.lync.com. | 1 h |
| CNAME | msoid | clientconfig.microsoftonline-p.net. | 1 h |
| CNAME | sip | sipdir.online.lync.com. | 1 h |
| CNAME | webdisk | basicamericanenterprises.com. | 10800 s |
| CNAME | webdisk.admin | basicamericanenterprises.com. | 10800 s |
| CNAME | whm | sucuriip.basicamericanenterprises.com. | 10800 s |
| CNAME | www | basicamericanenterprises.com. | 10800 s |
| CNAME | www.admin | basicamericanenterprises.com. | 10800 s |
| CNAME | _domainconnect | _domainconnect.gd.domaincontrol.com. | 1 h |
| SOA | @ | primary ns53.domaincontrol.com. | 1 h |
| MX | @ | mx1-usg1.ppe-hosted.com. (priority 0) | 1 h |
| MX | @ | mx2-usg1.ppe-hosted.com. (priority 0) | 1 h |
| MX | @ | mx3-usg1.ppe-hosted.com. (public DNS) | |
| TXT | @ | NETORGFT12518801.onmicrosoft.com (public DNS) | |
| TXT | @ | v=spf1 include:_spf-usg1.ppe-hosted.com include:secureserver.net ~all (public DNS) | |

The last page of the GoDaddy list (records 21-25) was not copied record by record; public DNS
shows the third MX and the two TXT records above. Likely also SRV records for Microsoft 365.

## Planned change (Fran, 2026-11-01)

- `@` A `72.167.58.141` becomes `216.150.1.1`, plus a second `@` A `216.150.16.1` (Vercel).
- `www` CNAME `basicamericanenterprises.com.` becomes `095409ac92b79add.vercel-dns-016.com.` (Vercel).
- Nothing else changes. `admin`, `mail`, `cpanel`, `whm`, `webdisk` still point at the old
  hosting; they can be cleaned up after the GoDaddy hosting is cancelled.

## Old hosting records removed (Fran, 2026-11-01)

After the GoDaddy hosting was cancelled: `admin` and `mail` A records were already gone.
Removed with Fran's yes: CNAME `cpanel`, `webdisk`, `webdisk.admin`, `whm`, `www.admin`.
GoDaddy now lists 19 records. Website (@, www), email (MX, TXT, autodiscover, msoid,
lyncdiscover, sip, SRV) and `email` are unchanged. Site and MX checked afterwards: fine.
