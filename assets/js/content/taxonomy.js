window.TAXONOMY = [
  {
    title: "RAID Levels by Characteristic",
    subtitle: "Classify each RAID level or trait by its defining data-protection characteristic.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "striping-only", label: "Striping only (no redundancy)" },
      { id: "mirroring", label: "Mirroring" },
      { id: "single-parity", label: "Single parity" },
      { id: "dual-parity", label: "Dual parity" }
    ],
    items: [
      { text: "RAID 0", cat: "striping-only" },
      { text: "Block-level striping with zero fault tolerance", cat: "striping-only" },
      { text: "Maximum capacity and speed, no data protection", cat: "striping-only" },
      { text: "RAID 1", cat: "mirroring" },
      { text: "Exact duplicate copy on a second disk", cat: "mirroring" },
      { text: "RAID 10", cat: "mirroring" },
      { text: "Striped set of mirrored pairs", cat: "mirroring" },
      { text: "RAID 5", cat: "single-parity" },
      { text: "Striping with one distributed parity block", cat: "single-parity" },
      { text: "Survives the loss of exactly one drive", cat: "single-parity" },
      { text: "Requires a minimum of three disks", cat: "single-parity" },
      { text: "RAID 6", cat: "dual-parity" },
      { text: "Striping with two distributed parity blocks", cat: "dual-parity" },
      { text: "Survives the simultaneous loss of two drives", cat: "dual-parity" },
      { text: "Requires a minimum of four disks", cat: "dual-parity" }
    ]
  },
  {
    title: "Storage Architectures",
    subtitle: "Sort each storage technology or component into its underlying architecture.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "das", label: "DAS (Direct-Attached Storage)" },
      { id: "nas", label: "NAS (Network-Attached Storage)" },
      { id: "san", label: "SAN (Storage Area Network)" }
    ],
    items: [
      { text: "Local SAS-attached disk shelf", cat: "das" },
      { text: "Internal SATA drives inside the server chassis", cat: "das" },
      { text: "External USB drive connected to one host", cat: "das" },
      { text: "Storage dedicated to a single server with no network", cat: "das" },
      { text: "SMB/CIFS file share over the LAN", cat: "nas" },
      { text: "NFS-exported volume for Linux clients", cat: "nas" },
      { text: "File-level access appliance on the network", cat: "nas" },
      { text: "Self-contained box serving folders to many users", cat: "nas" },
      { text: "iSCSI target presenting block storage", cat: "san" },
      { text: "Fibre Channel fabric with HBAs and zoning", cat: "san" },
      { text: "LUN masked to a specific initiator", cat: "san" },
      { text: "FCoE traffic over a converged network", cat: "san" },
      { text: "Block-level storage pool shared across hosts", cat: "san" },
      { text: "World Wide Name (WWN) addressing", cat: "san" }
    ]
  },
  {
    title: "Server+ Domains",
    subtitle: "Map each administrative task to its SK0-005 exam domain.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "hardware", label: "Server Hardware Installation & Management" },
      { id: "administration", label: "Server Administration" },
      { id: "security-dr", label: "Security & Disaster Recovery" },
      { id: "troubleshooting", label: "Troubleshooting" }
    ],
    items: [
      { text: "Racking a server and securing cable management arms", cat: "hardware" },
      { text: "Installing additional DIMMs in matched banks", cat: "hardware" },
      { text: "Connecting redundant power supplies to separate PDUs", cat: "hardware" },
      { text: "Seating an expansion card in a PCIe slot", cat: "hardware" },
      { text: "Configuring forward and reverse DNS zones", cat: "administration" },
      { text: "Applying the latest OS patches and updates", cat: "administration" },
      { text: "Creating and assigning user accounts and groups", cat: "administration" },
      { text: "Scripting a routine maintenance job", cat: "administration" },
      { text: "Enforcing multifactor authentication for admins", cat: "security-dr" },
      { text: "Testing the failover to a hot disaster-recovery site", cat: "security-dr" },
      { text: "Encrypting backups stored offsite", cat: "security-dr" },
      { text: "Hardening the server by disabling unused services", cat: "security-dr" },
      { text: "Diagnosing why a degraded array will not rebuild", cat: "troubleshooting" },
      { text: "Isolating the cause of intermittent network drops", cat: "troubleshooting" },
      { text: "Reading POST beep codes on a server that will not boot", cat: "troubleshooting" },
      { text: "Tracing high latency to a saturated storage controller", cat: "troubleshooting" }
    ]
  },
  {
    title: "DNS Record Types",
    subtitle: "Classify each DNS record by the function it performs.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "name-resolution", label: "Name Resolution (forward)" },
      { id: "mail", label: "Mail Routing" },
      { id: "reverse", label: "Reverse Lookup" },
      { id: "alias", label: "Alias / Canonical" }
    ],
    items: [
      { text: "A record", cat: "name-resolution" },
      { text: "AAAA record", cat: "name-resolution" },
      { text: "Maps a hostname to an IPv4 address", cat: "name-resolution" },
      { text: "Maps a hostname to an IPv6 address", cat: "name-resolution" },
      { text: "MX record", cat: "mail" },
      { text: "Directs email to the responsible mail server", cat: "mail" },
      { text: "Uses a preference value to order mail hosts", cat: "mail" },
      { text: "PTR record", cat: "reverse" },
      { text: "Maps an IP address back to a hostname", cat: "reverse" },
      { text: "Stored in the in-addr.arpa zone", cat: "reverse" },
      { text: "Used by mail servers for sender verification", cat: "reverse" },
      { text: "CNAME record", cat: "alias" },
      { text: "Points one name to another canonical name", cat: "alias" },
      { text: "Lets www and the apex resolve to the same host", cat: "alias" }
    ]
  },
  {
    title: "Backup Types & DR",
    subtitle: "Sort each concept into backup type, disaster-recovery site, or recovery metric.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "backup-type", label: "Backup Type" },
      { id: "dr-site", label: "DR Site Type" },
      { id: "dr-metric", label: "DR Metric" }
    ],
    items: [
      { text: "Full backup", cat: "backup-type" },
      { text: "Incremental backup", cat: "backup-type" },
      { text: "Differential backup", cat: "backup-type" },
      { text: "Synthetic full backup", cat: "backup-type" },
      { text: "Snapshot of a volume at a point in time", cat: "backup-type" },
      { text: "Hot site ready to run within minutes", cat: "dr-site" },
      { text: "Warm site with hardware but stale data", cat: "dr-site" },
      { text: "Cold site that is just space and power", cat: "dr-site" },
      { text: "Cloud-based recovery environment", cat: "dr-site" },
      { text: "RTO (Recovery Time Objective)", cat: "dr-metric" },
      { text: "RPO (Recovery Point Objective)", cat: "dr-metric" },
      { text: "Maximum tolerable amount of data loss", cat: "dr-metric" },
      { text: "Target time to restore a service after an outage", cat: "dr-metric" },
      { text: "Mean Time To Recovery (MTTR)", cat: "dr-metric" }
    ]
  },
  {
    title: "Virtualization & Cloud",
    subtitle: "Classify each technology by hypervisor type, cloud service model, or deployment model.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "hypervisor", label: "Hypervisor Type" },
      { id: "cloud-service-model", label: "Cloud Service Model" },
      { id: "cloud-deployment", label: "Cloud Deployment Model" }
    ],
    items: [
      { text: "Type 1 bare-metal hypervisor", cat: "hypervisor" },
      { text: "Type 2 hosted hypervisor", cat: "hypervisor" },
      { text: "Runs directly on the physical hardware", cat: "hypervisor" },
      { text: "Runs as an application on top of a host OS", cat: "hypervisor" },
      { text: "IaaS providing virtual machines and storage", cat: "cloud-service-model" },
      { text: "PaaS providing a managed development platform", cat: "cloud-service-model" },
      { text: "SaaS delivering finished applications", cat: "cloud-service-model" },
      { text: "Customer manages only the OS and apps", cat: "cloud-service-model" },
      { text: "Public cloud shared by many tenants", cat: "cloud-deployment" },
      { text: "Private cloud dedicated to one organization", cat: "cloud-deployment" },
      { text: "Hybrid cloud spanning on-prem and public", cat: "cloud-deployment" },
      { text: "Community cloud shared by similar organizations", cat: "cloud-deployment" }
    ]
  },
  {
    title: "Security Control Types",
    subtitle: "Sort each safeguard into the type of security control it represents.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "physical", label: "Physical Control" },
      { id: "technical", label: "Technical (Logical) Control" },
      { id: "administrative", label: "Administrative Control" }
    ],
    items: [
      { text: "Bollards blocking vehicle approach", cat: "physical" },
      { text: "Biometric fingerprint reader at the data center door", cat: "physical" },
      { text: "Mantrap controlling entry to the server room", cat: "physical" },
      { text: "Locking server rack cabinet", cat: "physical" },
      { text: "Security guard at the building entrance", cat: "physical" },
      { text: "Full-disk encryption on server volumes", cat: "technical" },
      { text: "Host-based firewall rule set", cat: "technical" },
      { text: "Intrusion detection system sensor", cat: "technical" },
      { text: "Role-based access control list", cat: "technical" },
      { text: "Multifactor authentication enforcement", cat: "technical" },
      { text: "Data retention and disposal policy", cat: "administrative" },
      { text: "Annual security awareness training", cat: "administrative" },
      { text: "Background checks during onboarding", cat: "administrative" },
      { text: "Change management approval procedure", cat: "administrative" }
    ]
  }
];
