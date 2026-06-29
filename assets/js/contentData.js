/* ============================================================================
   server+  ::  contentData.js
   Exam facts (single source of truth), per-domain metadata + objectives, PBQ
   format definitions, curated external resources, and the Exam-Mechanics and
   Career-Guidance readers. The dense per-domain reading content lives in
   lazy-loaded modules (assets/js/content/domainN.js) that populate SRVPLUS.reading.

   This file loads first and establishes the global SRVPLUS namespace consumed by
   quizEngine.js and app.js.

   Authored by Professor Rizwan Virani, San Jacinto College.
   ========================================================================== */
window.SRVPLUS = window.SRVPLUS || {};

/* ---------------------------------------------------------------------------
   SINGLE SOURCE OF TRUTH for every exam figure. The dashboard cards, mock-exam
   engine, scoring, analytics, readiness projection, and the readers below all
   read from this object — no exam figure is duplicated as a literal elsewhere.
   --------------------------------------------------------------------------- */
SRVPLUS.exam = {
  code: "SK0-005",
  name: "CompTIA Server+",
  minutes: 90,
  maxQuestions: 90,
  scaleLow: 100, scaleHigh: 900, passing: 750,
  domains: 4,
  launched: "2021"
};
/* Local alias so the readers below can interpolate the figures instead of
   re-typing them — keeps the single-source-of-truth guarantee intact. */
var E = SRVPLUS.exam;

/* Per-domain metadata. `objectives` mirror the official SK0-005 exam outline;
   `weight` values are the official domain percentages (18/30/24/28 = 100). */
SRVPLUS.domainMeta = [
  { id: 1, weight: 18, color: "d1", icon: "🖥", title: "Server Hardware Installation & Management", sectionCount: 12,
    short: "The physical layer: racking, cabling, power, and cooling; deploying and managing storage with RAID, shared storage, and capacity planning; and hardware maintenance through out-of-band management, firmware upgrades, and hot-swappable components.",
    objectives: [
      { id: "1.1", t: "Install physical hardware — racking, cabling, power, and cooling management" },
      { id: "1.2", t: "Deploy and manage storage — RAID levels, shared storage, and capacity planning" },
      { id: "1.3", t: "Perform hardware maintenance — out-of-band management, firmware upgrades, and hot-swappable components" }
    ] },
  { id: 2, weight: 30, color: "d2", icon: "⚙", title: "Server Administration", sectionCount: 18,
    short: "The largest domain: installing server operating systems; configuring network services (IP, DNS, DHCP, VLANs); managing roles, monitoring, and performance; high availability through clustering, load balancing, and failover; virtualization and cloud models; scripting basics; and asset management.",
    objectives: [
      { id: "2.1", t: "Install server operating systems — partition types, file systems, and installation methods" },
      { id: "2.2", t: "Configure network services — IP addressing, DNS, DHCP, and VLANs" },
      { id: "2.3", t: "Manage server functions — roles, monitoring, data migration, and performance metrics" },
      { id: "2.4", t: "High availability — clustering, load balancing, and failover processes" },
      { id: "2.5", t: "Virtualization — host vs. guest, resource allocation, and cloud models" },
      { id: "2.6", t: "Scripting basics — loops, variables, and common server tasks" },
      { id: "2.7", t: "Asset management — documentation, lifecycle management, and secure storage" }
    ] },
  { id: 3, weight: 24, color: "d3", icon: "🔒", title: "Security & Disaster Recovery", sectionCount: 14,
    short: "Protecting the server and its data: encryption and retention policies; physical and environmental access controls; identity and access management with MFA and permissions; mitigation through malware prevention, DLP, and SIEM; server hardening; and secure decommissioning and media destruction.",
    objectives: [
      { id: "3.1", t: "Data security — encryption, retention policies, and lifecycle management" },
      { id: "3.2", t: "Physical security — access controls, environmental controls, and biometric systems" },
      { id: "3.3", t: "Identity and access management — user accounts, MFA, and permissions" },
      { id: "3.4", t: "Mitigation strategies — malware prevention, DLP, and SIEM" },
      { id: "3.5", t: "Server hardening — OS updates, disabling unused services, and host security" },
      { id: "3.6", t: "Decommissioning — media destruction, recycling, and asset management" }
    ] },
  { id: 4, weight: 28, color: "d4", icon: "🛠", title: "Troubleshooting", sectionCount: 14,
    short: "Methodical diagnosis and recovery: hardware faults (power, storage, connectivity); software problems (OS errors, application issues, patching failures); network issues (latency, misconfiguration, breaches); and disaster recovery through backup strategies, recovery testing, and failover validation.",
    objectives: [
      { id: "4.1", t: "Troubleshoot hardware — power issues, storage failures, and connectivity problems" },
      { id: "4.2", t: "Troubleshoot software — OS errors, application issues, and patching failures" },
      { id: "4.3", t: "Troubleshoot network — latency, misconfigurations, and security breaches" },
      { id: "4.4", t: "Disaster recovery — backup strategies, recovery testing, and failover validation" }
    ] }
];

/* The PBQ formats. `domainColor` just drives the badge tint. */
SRVPLUS.pbqFormats = [
  { id: 1, icon: "💽", domainColor: 1, obj: "1.2", badge: "RAID & STORAGE", title: "RAID & Storage Configuration",
    desc: "Given a workload and a set of disks, choose the right RAID level, calculate usable capacity, and configure shared storage and capacity-planning fields.",
    long: "Each scenario gives you a server, a disk set, and a requirement (performance, redundancy, or capacity). Work the storage design field by field: the <b>RAID level</b>, the <b>usable capacity</b> and fault tolerance, the <b>shared-storage</b> protocol (iSCSI, FC, NFS, SMB), and the capacity-planning headroom." },
  { id: 2, icon: "🌐", domainColor: 2, obj: "2.1 / 2.2", badge: "OS & NETWORK", title: "OS Install & Network Services",
    desc: "Provision a server: pick partition style and file system, choose the installation method, and configure IP addressing, DNS, DHCP, and VLAN assignment.",
    long: "You are building a new server. For each field select the correct <b>partition style</b> (MBR/GPT) and <b>file system</b>, the right <b>installation method</b>, and then the network configuration — <b>IP/subnet</b>, <b>DNS</b>, <b>DHCP scope</b>, and <b>VLAN</b> — to fit the role and segment." },
  { id: 3, icon: "♻", domainColor: 2, obj: "2.4 / 2.5", badge: "HA & VIRTUALIZATION", title: "High Availability & Virtualization",
    desc: "Design for uptime: select clustering, load-balancing, and failover options, and allocate host/guest resources for a virtualization or cloud deployment.",
    long: "Engineer resilience. For each requirement choose the right <b>HA mechanism</b> (active/active vs active/passive cluster, load balancer, failover), the correct <b>quorum/heartbeat</b> design, and the <b>virtualization</b> choices — host vs guest sizing, resource allocation, and the appropriate cloud model." },
  { id: 4, icon: "🔐", domainColor: 3, obj: "3.3 / 3.5", badge: "HARDENING & IAM", title: "Security Hardening & IAM",
    desc: "Lock down a server: apply hardening steps, configure identity and access management with MFA and least-privilege permissions, and select mitigation controls.",
    long: "Harden the host. For each field choose the correct <b>hardening</b> action (disable unused services, patch, host firewall), the right <b>IAM</b> control (account type, MFA factor, permission model), and the <b>mitigation</b> (malware prevention, DLP, SIEM) that fits the threat." },
  { id: 5, icon: "🚑", domainColor: 4, obj: "4.1 / 4.4", badge: "TROUBLESHOOT & DR", title: "Troubleshooting & Disaster Recovery",
    desc: "Read the symptoms, identify the hardware/software/network fault, choose the next diagnostic step, and select the correct backup or failover recovery action.",
    long: "You are the on-call admin. Read the exhibit, then declare the <b>root cause</b> (power, storage, OS, application, network), the correct <b>next troubleshooting step</b> in the CompTIA methodology, and the right <b>disaster-recovery</b> action — backup type, recovery test, or failover validation." }
];

/* Curated free study resources for CompTIA Server+. */
SRVPLUS.resources = [
  { icon: "📄", title: "Official CompTIA Server+ (SK0-005) Exam Objectives", host: "comptia.org",
    url: "https://www.comptia.org/certifications/server",
    desc: "The authoritative exam outline — every objective and sub-bullet CompTIA can test. Download the objectives PDF from the certification page and use it as your master checklist." },
  { icon: "🪟", title: "Microsoft Learn — Windows Server", host: "learn.microsoft.com",
    url: "https://learn.microsoft.com/windows-server/",
    desc: "Free, authoritative documentation for installing, configuring, and administering Windows Server — roles, Active Directory, storage, clustering, and Hyper-V virtualization." },
  { icon: "🐧", title: "Red Hat Enterprise Linux Documentation", host: "access.redhat.com",
    url: "https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/",
    desc: "Comprehensive Linux server administration references — partitioning and file systems, networking, LVM/storage, systemd services, and hardening guidance for the Linux side of the exam." },
  { icon: "💾", title: "SNIA — Storage Networking Industry Association", host: "snia.org",
    url: "https://www.snia.org/education/dictionary",
    desc: "When a storage definition has to be exact, SNIA is the source. The dictionary and educational materials underpin RAID, SAN/NAS, iSCSI/FC, and capacity-planning vocabulary in Domain 1." },
  { icon: "📚", title: "NIST SP 800-88 — Media Sanitization", host: "csrc.nist.gov",
    url: "https://csrc.nist.gov/pubs/sp/800/88/r1/final",
    desc: "The reference for secure decommissioning: the clear/purge/destroy model that drives the media-destruction and data-disposal objectives in Domain 3." },
  { icon: "👥", title: "r/CompTIA — Community Wiki & Study Guides", host: "reddit.com/r/CompTIA",
    url: "https://www.reddit.com/r/CompTIA/wiki/index/",
    desc: "Crowd-sourced study plans, exam-day experiences, and the well-known community guides. Read recent “passed” posts for current question-style intel on Server+." }
];

/* ---- Reader: Exam Mechanics card. Figures interpolate from SRVPLUS.exam (E). ---- */
SRVPLUS.examMechanics = [
  { heading: "Format, length, and delivery", body:
    "<p>The <strong>" + E.name + " " + E.code + "</strong> is a single exam of <strong>up to " + E.maxQuestions + " questions</strong> to be completed in <strong>" + E.minutes + " minutes</strong>. It is delivered at a Pearson VUE testing center or via OnVUE online proctoring. Because the count is a <em>maximum</em>, your particular form may contain fewer scored items; CompTIA also seeds unscored items it is evaluating for future exams, and you cannot tell which is which — so treat every question as if it counts.</p>" +
    "<p>The exam mixes <strong>multiple-choice</strong> items (single- and multiple-response) with a handful of <strong>performance-based questions (PBQs)</strong>. PBQs are interactive tasks — configuring RAID and storage, provisioning network services, or working a troubleshooting scenario — and they typically appear first. They are worth more and consume more time, which leads directly to the single most important time-management rule below.</p>" +
    "<div class='callout exam'><div class='lbl'>Exam tip</div>PBQs front-load the exam and can eat your clock. If a PBQ stalls you, <strong>flag it and move on</strong>. Bank the fast multiple-choice points first, then return with whatever time remains.</div>" },
  { heading: "Scoring: the " + E.scaleLow + "–" + E.scaleHigh + " scale", body:
    "<p>Server+ is scored on a <strong>scaled range of " + E.scaleLow + " to " + E.scaleHigh + "</strong>, and the passing score is <strong>" + E.passing + "</strong>. Scaled scoring is not a simple percentage: CompTIA weights items by difficulty and equates across exam forms so that no candidate is advantaged or disadvantaged by drawing a harder set. As a result you cannot reverse-engineer an exact “number correct” from " + E.passing + ", and CompTIA does not publish the raw-to-scaled mapping.</p>" +
    "<p>Practically, strong candidates aim to answer a comfortable margin above the line. There is <strong>no penalty for guessing</strong> — an unanswered question is simply wrong — so you should never leave an item blank. Eliminate obviously wrong options, make your best choice, flag it if unsure, and move on.</p>" +
    "<blockquote>This platform's mock exam reports a scaled score using a transparent linear approximation of the " + E.scaleLow + "–" + E.scaleHigh + " band. Use it as a <em>relative</em> readiness signal — “am I trending toward " + E.passing + "?” — not as a literal prediction of your official score.</blockquote>" },
  { heading: "Question styles and how to read them", body:
    "<p>CompTIA writes “best answer” questions. Often two or three options are <em>plausible</em> and only one is <em>best</em> for the scenario described. Read the <strong>last sentence first</strong> — it usually contains the actual ask (“which RAID level <em>best</em> fits…”, “what should the technician do <em>first</em>…”). Words like <strong>first</strong>, <strong>best</strong>, <strong>most likely</strong>, and <strong>least</strong> are decisive; circle them mentally.</p>" +
    "<ul><li><strong>Multiple-response</strong> items tell you how many to pick (“choose two”). You must get all of them right for credit.</li><li><strong>Scenario</strong> items bury the relevant detail in a paragraph — identify the server role, the symptom, and the constraint before looking at options.</li><li><strong>PBQs</strong> reward methodical work; partial credit is generally available, so complete every field you can even if unsure of one.</li></ul>" +
    "<div class='callout'><div class='lbl'>Strategy</div>Use the <strong>flag-and-review</strong> workflow. First pass: answer everything you know cold and flag the rest. Second pass: spend remaining minutes only on flagged items. This guarantees you never run out of time with easy points unanswered.</div>" },
  { heading: "Eligibility, cost, and “good for life”", body:
    "<p>There are <strong>no formal prerequisites</strong>, but CompTIA recommends <strong>A+</strong> and roughly <strong>18–24 months</strong> of hands-on server or IT administration experience. The exam voucher cost varies by region. Academic and bundle discounts exist — ask your institution. There may also be funding available for a free voucher; connect with the Program Director or your professor for more information about funding opportunities.</p>" +
    "<p>Unlike most CompTIA certifications, <strong>Server+ does not expire</strong> — it is a <strong>“good for life”</strong> credential with no Continuing Education renewal. Once you pass, you hold it permanently, which makes it an efficient, durable addition to a data-center or systems-administration résumé.</p>" +
    "<div class='callout scenario'><div class='lbl'>Who this is for</div>Server administrators, data-center technicians, and systems engineers who install, configure, secure, and troubleshoot servers across on-premises, hybrid, and cloud environments — vendor-neutral across Windows and Linux.</div>" },
  { heading: "Exam-day logistics", body:
    "<p>Bring two forms of ID; for online proctoring you must show a clear workspace, a working webcam, and a stable connection. You cannot use notes, phones, or smartwatches. A simple on-screen whiteboard or provided scratch material may be available — use it to jot the acronym you'll otherwise lose under pressure (think RAID parity math, or the RTO/RPO pair).</p>" +
    "<div class='callout exam'><div class='lbl'>Mindset</div>Arrive early, breathe, and remember: the exam tests <strong>judgment and methodology</strong>, not trivia recall. Most questions are answerable by applying core principles — redundancy, least privilege, change control, and the CompTIA troubleshooting steps — to the scenario in front of you.</div>" }
];

/* ---- Reader: Career Guidance card ---- */
SRVPLUS.careerGuidance = [
  { heading: "Where Server+ sits on the ladder", body:
    "<p><strong>Server+ is the vendor-neutral certification for server professionals.</strong> It sits above the foundational <strong>A+</strong> and alongside <strong>Network+</strong>, validating that you can install, configure, secure, and troubleshoot server hardware and software across Windows and Linux, on-premises and in the cloud. Where A+ proves general IT support skills, Server+ proves you can run the machines the business depends on.</p>" +
    "<p>For hiring managers, Server+ on a résumé is shorthand for “this person understands RAID, virtualization, high availability, hardening, and disaster recovery, and won't take a production server down by accident.” It is frequently listed for data-center and systems-administration roles.</p>" },
  { heading: "A durable, vendor-neutral credential", body:
    "<p>Server+ is one of the few CompTIA certifications that is <strong>good for life</strong> — it never expires and requires no continuing-education renewal. That makes it an unusually efficient credential: pass once, hold it permanently. Because it is <strong>vendor-neutral</strong>, it complements rather than competes with vendor tracks like Microsoft, Red Hat, or VMware — it proves the underlying concepts those vendor exams assume.</p>" +
    "<div class='callout exam'><div class='lbl'>Why it matters</div>Many server-administration roles list Server+ as a preferred qualification precisely because it is hardware-and-OS agnostic — it signals transferable skill rather than knowledge of a single product line.</div>" },
  { heading: "Roles Server+ supports", body:
    "<p>Server+ aligns with a cluster of infrastructure roles:</p>" +
    "<ul>" +
    "<li><strong>Server / Systems Administrator</strong> — installing, patching, hardening, and monitoring Windows and Linux servers. Domains 2 and 3 map almost directly to this job.</li>" +
    "<li><strong>Data-Center Technician</strong> — racking, cabling, power and cooling, storage, and hardware maintenance. Domain 1 is the core skill set.</li>" +
    "<li><strong>Systems / Infrastructure Engineer</strong> — designing high availability, virtualization, and disaster recovery.</li>" +
    "<li><strong>NOC / Operations Technician</strong> — monitoring, troubleshooting, and incident response. Domain 4 underpins this work.</li>" +
    "<li><strong>Storage / Virtualization Administrator</strong> — RAID, SAN/NAS, and hypervisor management as a springboard into specialization.</li>" +
    "</ul>" },
  { heading: "Building the path beyond Server+", body:
    "<p>Treat Server+ as a launch point into infrastructure specialization. A common trajectory: <em>A+ → Server+ and hands-on admin experience → a vendor specialization</em>. From here, Windows-focused admins pursue <strong>Microsoft</strong> server and Azure certifications; Linux-focused admins pursue <strong>Red Hat (RHCSA/RHCE)</strong>; virtualization-bound learners add <strong>VMware</strong>; and security-minded admins layer on <strong>Security+</strong> to round out hardening and disaster-recovery skills.</p>" +
    "<div class='callout scenario'><div class='lbl'>Practical advice</div>Pair the cert with <strong>demonstrable hands-on skill</strong> — a home lab running a hypervisor with a couple of VMs, a RAID array you built and deliberately degraded, or a documented backup-and-restore test. Certifications get you past résumé filters; practical evidence gets you through interviews.</div>" }
];

/* Reading content is lazy-loaded. Each domain's dense reading sections live in
   assets/js/content/domainN.js and populate this object on demand:
   SRVPLUS.reading[N] = [ ...sections ]. */
SRVPLUS.reading = SRVPLUS.reading || {};

/* Flashcard decks are likewise lazy-loaded from assets/js/content/flashN.js
   (100 cards per domain) and populate this object: SRVPLUS.flash[N] = [ ...cards ]. */
SRVPLUS.flash = SRVPLUS.flash || {};
