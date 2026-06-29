/* ============================================================================
   server+  ::  content/pbqs.js
   Performance-based questions for CompTIA Server+ (SK0-005). 30 PBQs, 6 per
   format (formats 1-5). Populates SRVPLUS.pbqs consumed by quizEngine.js.

   Authored by Professor Rizwan Virani, San Jacinto College.
   ========================================================================== */
window.SRVPLUS = window.SRVPLUS || {}; SRVPLUS.pbqs = SRVPLUS.pbqs || [];

SRVPLUS.pbqs.push(

  /* ============== FORMAT 1 : RAID & Storage Configuration =============== */

  { id:"PBQ-001", format:1, domain:1,
    title:"Database Server Disk Layout",
    brief:"A transactional database server has four identical 4 TB SAS drives. The owner wants the best balance of read/write performance and single-disk fault tolerance, served to two app hosts as block storage over Ethernet.",
    exhibitTitle:"raid://db-array0",
    exhibit:"  <span class='cy'>[ DB Server : array0 ]</span>\n  +--------+  +--------+  +--------+  +--------+\n  | <span class='hl'>4 TB</span>   |  | <span class='hl'>4 TB</span>   |  | <span class='hl'>4 TB</span>   |  | <span class='hl'>4 TB</span>   |\n  | SAS d0 |  | SAS d1 |  | SAS d2 |  | SAS d3 |\n  +--------+  +--------+  +--------+  +--------+\n  Requirement: <span class='ok'>fast R/W</span> + tolerate <span class='warnc'>1 disk loss</span>\n  Served to:  app-h1, app-h2  (block, over Ethernet)",
    fields:[
      { label:"RAID level", hint:"Mirror a stripe.", options:["RAID 0","RAID 5","RAID 10","RAID 6"], answer:2, explain:"RAID 10 (a stripe of mirrors) gives strong read/write performance and tolerates a single-disk failure with no parity write penalty, fitting a transactional DB." },
      { label:"Usable capacity", hint:"Half is mirror overhead.", options:["4 TB","8 TB","12 TB","16 TB"], answer:1, explain:"RAID 10 across four 4 TB drives mirrors half the capacity, leaving 2 x 4 TB = 8 TB usable." },
      { label:"Fault tolerance", options:["No disk loss tolerated","One disk per mirror pair","All four disks","Two disks from the same mirror"], answer:1, explain:"RAID 10 survives one failed disk in each mirror pair; losing both members of one pair fails the array." },
      { label:"Shared-storage protocol", hint:"Block over standard Ethernet.", options:["NFS","SMB","iSCSI","FTP"], answer:2, explain:"iSCSI presents block storage (the database expects raw blocks) over standard Ethernet, unlike NFS/SMB which are file-level protocols." }
    ],
    summary:"RAID 10 on four 4 TB disks yields 8 TB usable, tolerates one disk per mirror, and is best presented to the app hosts as iSCSI block storage." },

  { id:"PBQ-002", format:1, domain:1,
    title:"Capacity-First Archive Volume",
    brief:"An archive server holds five 8 TB SATA drives for cold data. Maximize usable capacity while still tolerating a single drive failure. Files are shared read-mostly to Windows clients.",
    exhibitTitle:"raid://archive1",
    exhibit:"  <span class='cy'>[ Archive : 5 x 8 TB SATA ]</span>\n  d0 d1 d2 d3 d4\n  [#][#][#][#][#]   each <span class='hl'>8 TB</span>\n  Goal: <span class='ok'>max capacity</span>, survive <span class='warnc'>1 drive</span>\n  Clients: Windows file shares (read-mostly)",
    fields:[
      { label:"RAID level", hint:"Single distributed parity.", options:["RAID 1","RAID 5","RAID 10","RAID 0"], answer:1, explain:"RAID 5 uses one drive's worth of distributed parity, maximizing usable capacity while tolerating a single-disk failure, ideal for read-mostly archive data." },
      { label:"Usable capacity", hint:"N minus one drive of parity.", options:["24 TB","32 TB","40 TB","16 TB"], answer:1, explain:"RAID 5 across five 8 TB drives loses one drive to parity: (5-1) x 8 TB = 32 TB usable." },
      { label:"Fault tolerance", options:["Two simultaneous disks","One disk at a time","No fault tolerance","Three disks"], answer:1, explain:"Single-parity RAID 5 tolerates exactly one failed disk; a second failure during rebuild loses the array." },
      { label:"Shared-storage protocol", hint:"Windows file shares.", options:["iSCSI","FC","SMB","NVMe-oF"], answer:2, explain:"SMB (CIFS) is the native file-sharing protocol for Windows clients, appropriate for shared file access rather than block presentation." }
    ],
    summary:"RAID 5 on five 8 TB disks gives 32 TB usable, tolerates one disk, and is shared to Windows clients over SMB." },

  { id:"PBQ-003", format:1, domain:1,
    title:"Large-Array Rebuild Resilience",
    brief:"A media server uses eight 6 TB drives. URE risk during long rebuilds is a concern, so the design must survive two concurrent drive failures while keeping good capacity. Linux hosts mount the export over the network.",
    exhibitTitle:"raid://media2",
    exhibit:"  <span class='cy'>[ Media : 8 x 6 TB ]</span>\n  d0 d1 d2 d3 d4 d5 d6 d7\n  [#][#][#][#][#][#][#][#]  each <span class='hl'>6 TB</span>\n  Concern: <span class='warnc'>URE during 6 TB rebuild</span>\n  Need: survive <span class='ok'>2 drive failures</span>\n  Mount: Linux NFS clients",
    fields:[
      { label:"RAID level", hint:"Double distributed parity.", options:["RAID 5","RAID 6","RAID 10","RAID 50"], answer:1, explain:"RAID 6 uses dual distributed parity so it survives two concurrent failures, the right hedge against a second URE/disk loss during a long large-disk rebuild." },
      { label:"Usable capacity", hint:"N minus two drives of parity.", options:["36 TB","48 TB","42 TB","30 TB"], answer:0, explain:"RAID 6 loses two drives to parity: (8-2) x 6 TB = 36 TB usable." },
      { label:"Fault tolerance", options:["One disk","Two disks simultaneously","Three disks","Zero disks"], answer:1, explain:"Dual-parity RAID 6 tolerates any two simultaneous disk failures before data loss." },
      { label:"Shared-storage protocol", hint:"Linux file mount.", options:["SMB","NFS","iSCSI","HTTP"], answer:1, explain:"NFS is the native network file system for UNIX/Linux clients, appropriate for mounting the shared export." }
    ],
    summary:"RAID 6 on eight 6 TB disks yields 36 TB usable, survives two simultaneous failures, and is exported to Linux hosts via NFS." },

  { id:"PBQ-004", format:1, domain:1,
    title:"Boot Mirror Plus Headroom",
    brief:"A new hypervisor host needs a resilient OS/boot volume from two 480 GB SSDs, plus a plan that keeps a usable volume below 80% to leave growth headroom. Datastore LUNs come from a Fibre Channel SAN.",
    exhibitTitle:"raid://boot-host",
    exhibit:"  <span class='cy'>[ Boot pair ]</span>\n  +----------+   +----------+\n  | 480 GB   |===| 480 GB   |   <span class='ok'>mirror</span>\n  | SSD a    |   | SSD b    |\n  +----------+   +----------+\n  Rule: keep usable volume under <span class='warnc'>80% full</span>\n  Datastores: FC SAN LUNs",
    fields:[
      { label:"RAID level", hint:"Two disks, full redundancy.", options:["RAID 0","RAID 1","RAID 5","RAID 6"], answer:1, explain:"RAID 1 mirrors the two SSDs, giving a fault-tolerant boot volume; RAID 5/6 need three or more disks." },
      { label:"Usable capacity", hint:"Mirror = size of one disk.", options:["240 GB","480 GB","960 GB","720 GB"], answer:1, explain:"A two-disk mirror presents the capacity of a single member: 480 GB usable." },
      { label:"Capacity headroom (80% rule)", hint:"80% of 480 GB.", options:["240 GB used max","384 GB used max","480 GB used max","432 GB used max"], answer:1, explain:"Keeping the 480 GB volume under 80% caps usage at 0.80 x 480 = 384 GB before growth planning is required." },
      { label:"Shared-storage protocol", hint:"SAN block over fiber.", options:["NFS","Fibre Channel","SMB","iSCSI"], answer:1, explain:"Fibre Channel delivers block LUNs from the SAN over a dedicated fiber fabric, matching the stated datastore source." }
    ],
    summary:"RAID 1 mirrors the two 480 GB SSDs for 480 GB usable (384 GB at the 80% ceiling); datastores arrive as Fibre Channel LUNs." },

  { id:"PBQ-005", format:1, domain:1,
    title:"Scratch Volume for Render Jobs",
    brief:"A render node needs the fastest possible temporary scratch volume from three 2 TB NVMe drives; the data is disposable and re-creatable, so redundancy is not required. Output is later pushed to an iSCSI target.",
    exhibitTitle:"raid://scratch",
    exhibit:"  <span class='cy'>[ Render scratch ]</span>\n  d0 d1 d2\n  [>][>][>]  each <span class='hl'>2 TB NVMe</span> striped\n  Data: <span class='dim'>disposable, re-creatable</span>\n  Priority: <span class='ok'>max speed</span>, no redundancy\n  Final output -> iSCSI target",
    fields:[
      { label:"RAID level", hint:"Pure stripe, no parity/mirror.", options:["RAID 0","RAID 1","RAID 5","RAID 10"], answer:0, explain:"RAID 0 stripes for maximum throughput with zero redundancy overhead, acceptable because the scratch data is disposable." },
      { label:"Usable capacity", hint:"All disks contribute.", options:["2 TB","4 TB","6 TB","3 TB"], answer:2, explain:"RAID 0 sums all members: 3 x 2 TB = 6 TB usable, with no capacity lost to redundancy." },
      { label:"Fault tolerance", options:["One disk","Two disks","None - any failure loses all data","Three disks"], answer:2, explain:"RAID 0 has no redundancy; the failure of any single drive destroys the entire striped volume." },
      { label:"Shared-storage protocol for final output", hint:"Block over Ethernet.", options:["SMB","iSCSI","NFS","DNS"], answer:1, explain:"iSCSI presents the destination as block storage over Ethernet, matching the stated iSCSI target." }
    ],
    summary:"RAID 0 on three 2 TB NVMe gives 6 TB of fast, non-redundant scratch; finished output is written to an iSCSI block target." },

  { id:"PBQ-006", format:1, domain:1,
    title:"Hot Spare and Growth Planning",
    brief:"A six-bay file server runs RAID 5 on four 4 TB drives, with one drive as a dedicated hot spare and one bay empty. Plan the usable size, the spare behavior, and the headroom before expansion.",
    exhibitTitle:"raid://fileserv",
    exhibit:"  <span class='cy'>[ 6-bay file server ]</span>\n  b0  b1  b2  b3   b4      b5\n  [#] [#] [#] [#]  [<span class='ok'>S</span>]   [ ]\n  4TB 4TB 4TB 4TB  spare   empty\n  Array: <span class='hl'>RAID 5 over b0-b3</span>\n  Hot spare: b4   |  Growth bay: b5",
    fields:[
      { label:"RAID level in use", hint:"Single parity across four.", options:["RAID 6","RAID 5","RAID 10","RAID 1"], answer:1, explain:"Four data drives with one parity drive's worth of distributed parity is RAID 5." },
      { label:"Usable capacity", hint:"Four drives, one of parity.", options:["8 TB","12 TB","16 TB","20 TB"], answer:1, explain:"RAID 5 over four 4 TB drives loses one to parity: (4-1) x 4 TB = 12 TB usable; the hot spare is not part of usable capacity." },
      { label:"Hot-spare behavior on a failure", options:["Manual swap required","Auto-rebuilds onto the spare immediately","Array goes offline","Spare is ignored"], answer:1, explain:"A dedicated hot spare automatically replaces a failed member and begins rebuilding without operator intervention, shortening exposure time." },
      { label:"Capacity headroom (75% rule)", hint:"75% of 12 TB usable.", options:["6 TB","9 TB","12 TB","10.5 TB"], answer:1, explain:"At a 75% planning threshold the 12 TB volume should not exceed 0.75 x 12 = 9 TB before expansion into the empty bay is scheduled." }
    ],
    summary:"RAID 5 over four 4 TB drives gives 12 TB usable; a hot spare auto-rebuilds on failure, and the 75% rule flags expansion at 9 TB used." },

  /* ============== FORMAT 2 : OS Install & Network Services ============== */

  { id:"PBQ-007", format:2, domain:2,
    title:"UEFI Windows Server Build",
    brief:"You are installing Windows Server on a host with a 4 TB boot disk and UEFI firmware. Pick the partition style, file system, and a hands-off deployment method, then assign a static address in the server subnet.",
    exhibitTitle:"build://win-srv01",
    exhibit:"  <span class='cy'>[ win-srv01 ]</span>\n  Firmware: <span class='hl'>UEFI</span>   Boot disk: <span class='hl'>4 TB</span>\n  Role: domain member file server\n  Subnet: 10.10.20.0/24  GW 10.10.20.1\n  DHCP pool: .100-.200   <span class='warnc'>servers use static</span>",
    fields:[
      { label:"Partition style", hint:"Boot disk over 2 TB + UEFI.", options:["MBR","GPT","LVM","ZFS"], answer:1, explain:"GPT is required for a boot disk larger than 2 TB and for UEFI boot; MBR caps at 2 TB and is for legacy BIOS." },
      { label:"File system", hint:"Windows default volume.", options:["ext4","NTFS","XFS","FAT32"], answer:1, explain:"NTFS is the standard Windows Server file system with journaling, ACLs, and large-volume support; FAT32 lacks permissions and has size limits." },
      { label:"Installation method", hint:"Hands-off, repeatable.", options:["Manual DVD install","Unattended image deployment (WDS/answer file)","Live USB browse","Single-disk clone by hand"], answer:1, explain:"An unattended/imaged deployment with an answer file is the repeatable, hands-off method appropriate for provisioning servers at scale." },
      { label:"IP assignment", hint:"Outside the DHCP pool.", options:["10.10.20.150 from DHCP","Static 10.10.20.10 /24","169.254.5.5 APIPA","10.10.20.1 /24"], answer:1, explain:"Servers take a static address outside the DHCP pool (.100-.200) and not the gateway; 10.10.20.10/24 is valid; .150 is inside the pool and .1 is the gateway." }
    ],
    summary:"A UEFI host with a 4 TB boot disk uses GPT + NTFS, is deployed via an unattended image, and receives a static 10.10.20.10/24 address outside the DHCP pool." },

  { id:"PBQ-008", format:2, domain:2,
    title:"Linux Web Server Provisioning",
    brief:"Provision a Linux web server with a large data volume on a UEFI host. Choose partition style, a journaling file system suited to large files, a network install method, and the DNS record that resolves its name.",
    exhibitTitle:"build://web-lnx",
    exhibit:"  <span class='cy'>[ web-lnx ]</span>\n  Firmware: <span class='hl'>UEFI</span>   Data volume: 8 TB\n  Distro: enterprise Linux, headless\n  Name: www.lab.local -> 10.10.30.25\n  DNS server: 10.10.30.2   <span class='dim'>PXE available</span>",
    fields:[
      { label:"Partition style", hint:"Large disk + UEFI.", options:["MBR","GPT","exFAT","Bootmgr"], answer:1, explain:"GPT supports the 8 TB volume and UEFI booting; MBR cannot address beyond 2 TB." },
      { label:"File system", hint:"Linux journaling, large files.", options:["NTFS","XFS","FAT16","ReFS"], answer:1, explain:"XFS is a high-performance journaling file system common on enterprise Linux for large data volumes; NTFS/ReFS are Windows file systems." },
      { label:"Installation method", hint:"Headless network boot.", options:["PXE network install with kickstart","Manual GUI installer","Floppy boot","Recovery console only"], answer:0, explain:"PXE booting with a kickstart answer file gives an automated, headless network install, matching the available PXE infrastructure." },
      { label:"DNS record to publish", hint:"Name to IPv4 address.", options:["MX record","A record www -> 10.10.30.25","PTR only","TXT record"], answer:1, explain:"An A record maps the host name www.lab.local to its IPv4 address 10.10.30.25 so clients can resolve it; MX is for mail and TXT carries metadata." }
    ],
    summary:"The Linux web server uses GPT + XFS, installs via PXE/kickstart, and is published with an A record pointing www.lab.local to 10.10.30.25." },

  { id:"PBQ-009", format:2, domain:2,
    title:"Subnet and DHCP Scope Sizing",
    brief:"A new branch VLAN needs addressing for about 50 hosts plus servers and a gateway. Define the subnet mask, identify the broadcast address, and set a DHCP scope that excludes the static range.",
    exhibitTitle:"build://branch-vlan",
    exhibit:"  <span class='cy'>[ Branch VLAN 30 ]</span>\n  Network: 192.168.30.0\n  Hosts needed: ~50 + servers\n  Gateway: 192.168.30.1\n  Static block: .2 - .20   <span class='warnc'>reserve for servers</span>\n  DHCP: dynamic clients <span class='ok'>above .20</span>",
    fields:[
      { label:"Subnet mask", hint:"One /24 covers 50 hosts.", options:["255.255.255.0 (/24)","255.255.255.192 (/26)","255.255.255.128 (/25)","255.255.255.0 (/23)"], answer:0, explain:"A /24 (255.255.255.0) provides 254 usable addresses, comfortably covering ~50 hosts plus servers and gateway in one segment." },
      { label:"Broadcast address", hint:"Last address in the /24.", options:["192.168.30.0","192.168.30.255","192.168.30.254","192.168.31.0"], answer:1, explain:"In 192.168.30.0/24 the broadcast is the all-ones host portion: 192.168.30.255." },
      { label:"DHCP scope range", hint:"Above the static reservation.", options:[".2 - .254",".21 - .254 (exclude .1-.20)",".1 - .20",".100 - .100"], answer:1, explain:"The scope must start above the reserved static block (.2-.20) and exclude the gateway, so .21-.254 is correct." },
      { label:"VLAN assignment", hint:"Branch segment id.", options:["Native VLAN 1","Access VLAN 30 on the client port","Trunk all VLANs to clients","No VLAN tag"], answer:1, explain:"Client switch ports for this segment are assigned as access ports in VLAN 30; trunking all VLANs to an endpoint is a misconfiguration." }
    ],
    summary:"The branch uses 192.168.30.0/24 (broadcast .255), a DHCP scope of .21-.254 above the static block, with client ports as access VLAN 30." },

  { id:"PBQ-010", format:2, domain:2,
    title:"Dual-Boot Legacy Hardware",
    brief:"An older server with legacy BIOS and a 1.5 TB disk must run an OS that needs cross-platform file exchange on a small data partition. Select compatible partition style, file system, install media, and addressing.",
    exhibitTitle:"build://legacy-srv",
    exhibit:"  <span class='cy'>[ legacy-srv ]</span>\n  Firmware: <span class='warnc'>legacy BIOS</span>  Disk: <span class='hl'>1.5 TB</span>\n  Need: small partition readable by Win + Linux\n  No network boot infra available\n  Static mgmt IP on 172.16.5.0/24",
    fields:[
      { label:"Partition style", hint:"BIOS boot, disk under 2 TB.", options:["GPT only","MBR","GUID/EFI System","Dynamic disk spanning"], answer:1, explain:"Legacy BIOS booting on a sub-2 TB disk works with MBR; GPT boot generally requires UEFI." },
      { label:"Cross-platform data file system", hint:"Readable by Windows and Linux.", options:["NTFS","exFAT","HFS+","ReFS"], answer:1, explain:"exFAT is natively read/write on both Windows and Linux without permissions overhead, ideal for a shared exchange partition." },
      { label:"Installation method", hint:"No PXE infrastructure.", options:["PXE network install","Bootable USB/optical local media","Cloud image import","iSCSI boot"], answer:1, explain:"With no network-boot infrastructure, local bootable USB or optical media is the practical install method." },
      { label:"Management IP", hint:"Valid host on /24.", options:["172.16.5.0 /24","172.16.5.50 /24","172.16.5.255 /24","172.16.6.1 /24"], answer:1, explain:"172.16.5.50/24 is a valid host address; .0 is the network id, .255 is broadcast, and .6.x is a different subnet." }
    ],
    summary:"Legacy BIOS on a 1.5 TB disk uses MBR with an exFAT exchange partition, installs from local USB/optical media, and takes a static 172.16.5.50/24 management address." },

  { id:"PBQ-011", format:2, domain:2,
    title:"Domain Controller Network Roles",
    brief:"You are standing up a domain controller that will also serve internal name resolution and dynamic addressing. Decide the file system, the DNS responsibility, the DHCP authorization, and the time configuration.",
    exhibitTitle:"build://dc01",
    exhibit:"  <span class='cy'>[ dc01 - domain controller ]</span>\n  Domain: corp.local\n  Services: <span class='hl'>AD DS + DNS + DHCP</span>\n  Subnet: 10.0.0.0/24   self: 10.0.0.5\n  Clients need: name lookup + leases\n  <span class='warnc'>Kerberos is time-sensitive</span>",
    fields:[
      { label:"System volume file system", hint:"AD SYSVOL requirement.", options:["FAT32","NTFS","ext3","exFAT"], answer:1, explain:"Active Directory requires NTFS for the SYSVOL and database volume because it depends on NTFS permissions and journaling." },
      { label:"DNS role on the DC", hint:"AD-integrated zone.", options:["Forward all queries, host no zone","Host an AD-integrated zone for corp.local","Disable DNS, use hosts file","Public recursive resolver"], answer:1, explain:"A domain controller should host the AD-integrated DNS zone for corp.local so clients can locate domain services via SRV records." },
      { label:"DHCP deployment step", hint:"AD requirement for Windows DHCP.", options:["Authorize the DHCP server in AD","Run DHCP without authorization","Use APIPA for clients","Static-only network"], answer:0, explain:"A Windows DHCP server must be authorized in Active Directory before it will lease addresses, preventing rogue servers." },
      { label:"Time source", hint:"Kerberos 5-minute skew limit.", options:["Each host free-runs its clock","Sync the DC hierarchy to an authoritative NTP source","Disable time service","Random local time"], answer:1, explain:"Kerberos fails outside roughly a 5-minute skew, so the DC must sync to an authoritative NTP source and serve time to domain members." }
    ],
    summary:"The DC uses NTFS, hosts an AD-integrated DNS zone, must be DHCP-authorized in AD, and synchronizes to authoritative NTP to satisfy Kerberos time limits." },

  { id:"PBQ-012", format:2, domain:2,
    title:"Segmenting Storage and Management Traffic",
    brief:"A server has separate NICs for storage and management. Plan VLAN tagging, addressing on a smaller storage subnet, jumbo frames, and the gateway behavior for the isolated storage network.",
    exhibitTitle:"build://multi-nic",
    exhibit:"  <span class='cy'>[ multi-nic host ]</span>\n  NIC0 mgmt   -> VLAN 10  10.10.10.0/24\n  NIC1 iSCSI  -> VLAN 99  <span class='hl'>10.99.0.0/29</span>\n  Goal: isolate <span class='ok'>storage</span> from <span class='warnc'>routed</span> traffic\n  Storage stays L2-local (no routing)",
    fields:[
      { label:"Storage subnet mask", hint:"/29 host count.", options:["255.255.255.0","255.255.255.248 (/29)","255.255.255.252 (/30)","255.255.255.0 (/24)"], answer:1, explain:"A /29 (255.255.255.248) yields 6 usable host addresses, enough for an initiator and a couple of targets on an isolated storage segment." },
      { label:"VLAN tagging", hint:"Two VLANs to one host.", options:["Untag both NICs on VLAN 1","Tag NIC0 access VLAN 10, NIC1 access VLAN 99","Trunk every VLAN to NIC1","No VLANs at all"], answer:1, explain:"Each NIC is placed in its own access VLAN (mgmt 10, storage 99) to separate the traffic domains cleanly." },
      { label:"Storage NIC gateway", hint:"Isolated, non-routed.", options:["Set gateway to 10.10.10.1","No default gateway on the storage NIC","Use the mgmt gateway","0.0.0.0 as gateway"], answer:1, explain:"An isolated L2 storage segment should have no default gateway on the storage NIC so iSCSI traffic stays local and is not routed." },
      { label:"Frame size for iSCSI", hint:"Reduce per-packet overhead.", options:["Standard 1500 MTU only","Enable jumbo frames (MTU 9000) end to end","Disable the NIC","Fragment all frames"], answer:1, explain:"Jumbo frames (MTU 9000) reduce overhead and CPU for iSCSI throughput, but must be enabled consistently on host, switch, and target." }
    ],
    summary:"Storage uses a /29 on VLAN 99 with per-NIC access VLANs, no gateway on the isolated storage NIC, and jumbo frames enabled end to end for iSCSI." },

  /* ============ FORMAT 3 : High Availability & Virtualization =========== */

  { id:"PBQ-013", format:3, domain:2,
    title:"Two-Node Web Cluster",
    brief:"Two identical web servers must share traffic and survive the loss of one node. Choose the cluster style, the traffic-distribution mechanism, the health mechanism, and the deployment model.",
    exhibitTitle:"ha://web-cluster",
    exhibit:"  <span class='cy'>[ VIP 10.0.0.50 ]</span>\n        |\n   +----+----+\n   |         |\n [<span class='ok'>web-a</span>]   [<span class='ok'>web-b</span>]   both <span class='hl'>active</span>\n  Goal: split load, survive 1 node\n  <span class='dim'>stateless HTTP, shared backend DB</span>",
    fields:[
      { label:"Cluster type", hint:"Both nodes serve at once.", options:["Active/passive","Active/active","Cold standby","Single node"], answer:1, explain:"Stateless web servers behind a VIP run active/active so both nodes serve requests simultaneously and capacity is used fully." },
      { label:"Traffic distribution", hint:"Spread across nodes.", options:["Round-robin/least-connections load balancing","DNS round-robin only with no health check","Manual failover","First node only"], answer:0, explain:"A load balancer using round-robin or least-connections spreads HTTP requests across both nodes and removes unhealthy ones." },
      { label:"Health mechanism", hint:"Detect a dead node.", options:["Ping the gateway","Health-check probes to each node (HTTP 200)","Check disk SMART only","No monitoring"], answer:1, explain:"Application-layer health probes (expecting HTTP 200) let the balancer detect and bypass a failed node quickly." },
      { label:"Deployment model", hint:"Self-managed compute.", options:["SaaS","IaaS (own VMs)","DRaaS","Function-as-a-Service only"], answer:1, explain:"Running and managing the web VMs yourself is Infrastructure as a Service; SaaS would mean consuming a finished application." }
    ],
    summary:"A stateless web tier runs active/active behind a load balancer with HTTP health probes, deployed on self-managed IaaS VMs." },

  { id:"PBQ-014", format:3, domain:2,
    title:"Database Failover Cluster Quorum",
    brief:"A two-node database cluster runs active/passive. With an even node count, you must prevent split-brain. Pick the failover style, the quorum design, the heartbeat path, and the shared-storage approach.",
    exhibitTitle:"ha://db-cluster",
    exhibit:"  <span class='cy'>[ db-cluster ]</span>\n  node1 <span class='ok'>active</span>   <===>   node2 <span class='dim'>passive</span>\n     \\                       /\n      +--- shared LUN (SAN) -+\n  Risk: <span class='warnc'>even nodes -> split-brain</span>\n  Need: arbitration + dedicated heartbeat",
    fields:[
      { label:"Cluster type", hint:"One serves, one waits.", options:["Active/active","Active/passive","Load-balanced stateless","Standalone"], answer:1, explain:"A transactional DB with a single shared dataset typically runs active/passive so only one node owns the database at a time." },
      { label:"Quorum design", hint:"Break the tie on even nodes.", options:["No quorum needed","Add a witness/quorum disk or file-share witness","Give each node 2 votes","Disable failover"], answer:1, explain:"With an even node count a witness (disk or file share) provides the odd vote needed to maintain quorum and avoid split-brain." },
      { label:"Heartbeat path", hint:"Isolate cluster signaling.", options:["Share the production NIC","Dedicated private heartbeat network between nodes","Heartbeat over the internet","No heartbeat"], answer:1, explain:"A dedicated, redundant private network for heartbeats keeps cluster signaling reliable and separate from production load." },
      { label:"Shared storage", hint:"Both nodes see one dataset.", options:["Local disk per node only","A shared LUN both nodes can access (SAN)","No shared storage","RAID 0 scratch"], answer:1, explain:"Failover clustering requires shared storage (a SAN LUN) so the surviving node can mount the same data after takeover." }
    ],
    summary:"The DB runs active/passive with a witness for quorum, a dedicated heartbeat network, and a shared SAN LUN to avoid split-brain and enable failover." },

  { id:"PBQ-015", format:3, domain:2,
    title:"VM Resource Allocation Pitfalls",
    brief:"A virtualization host is consolidating VMs. You must avoid CPU/memory overcommit problems and size a critical VM correctly. Choose host sizing, memory policy, vCPU policy, and storage provisioning.",
    exhibitTitle:"ha://hypervisor",
    exhibit:"  <span class='cy'>[ ESX host: 32 pCPU / 256 GB ]</span>\n  VMs: 18 guests planned\n  Critical VM: <span class='hl'>DB - 8 vCPU / 64 GB</span>\n  Symptom seen on test host: <span class='warnc'>high CPU ready</span>\n  Datastore: thin or thick?",
    fields:[
      { label:"vCPU sizing for the critical VM", hint:"High CPU-ready means contention.", options:["Assign all 32 vCPUs","Right-size to needed vCPUs (avoid over-allocating)","Set 1 vCPU only","Disable the scheduler"], answer:1, explain:"High CPU-ready time signals scheduling contention; over-allocating vCPUs worsens it, so right-size the VM to what it actually needs." },
      { label:"Memory policy", hint:"Guarantee critical RAM.", options:["Aggressively overcommit all RAM","Reserve memory for the critical DB VM","Disable the balloon driver everywhere","Give every VM max RAM"], answer:1, explain:"A memory reservation guarantees the critical DB VM its RAM and avoids ballooning/swapping under contention." },
      { label:"Storage provisioning", hint:"Predictable DB performance.", options:["Thin-provision the DB and overcommit the datastore","Thick-provision the critical DB datastore","No datastore monitoring","Snapshot chain as primary disk"], answer:1, explain:"Thick provisioning gives the database predictable space and avoids out-of-space stalls from datastore overcommit; thin suits low-priority guests." },
      { label:"Cloud model if offloaded", hint:"Managed DB engine.", options:["IaaS raw VM","PaaS managed database service","Co-location only","Bare metal you rack yourself"], answer:1, explain:"Consuming a managed database engine without managing the OS is Platform as a Service; IaaS would still leave OS/patching to you." }
    ],
    summary:"Right-size vCPUs, reserve memory and thick-provision storage for the critical DB VM to fix contention; a managed DB offload would be PaaS." },

  { id:"PBQ-016", format:3, domain:2,
    title:"Geographic Redundancy and DR Site",
    brief:"A business wants a warm secondary site for an application with a 1-hour RPO. Choose the replication style, the failover mechanism, the site readiness tier, and the cloud DR model.",
    exhibitTitle:"ha://geo-dr",
    exhibit:"  <span class='cy'>[ Primary DC ]</span> ==replicate==> <span class='ok'>[ DR Site ]</span>\n  RPO target: <span class='hl'>1 hour</span>   RTO target: 2 hours\n  DR site: servers powered, data <span class='dim'>near-current</span>\n  Need: orderly failover, not instant",
    fields:[
      { label:"Replication style", hint:"1-hour RPO tolerance.", options:["Synchronous (zero RPO)","Asynchronous replication","Nightly tape only","No replication"], answer:1, explain:"Asynchronous replication meets a 1-hour RPO over distance without the latency penalty of synchronous writes." },
      { label:"Site readiness tier", hint:"Powered, data near-current, not live.", options:["Cold site","Warm site","Hot site (instant)","No site"], answer:1, explain:"A warm site has hardware running and data near-current, requiring a short cutover, which matches the 2-hour RTO and asynchronous data." },
      { label:"Failover mechanism", hint:"Controlled cutover.", options:["Automatic instant failover","Orchestrated/manual failover runbook","Do nothing","Round-robin DNS only"], answer:1, explain:"With a warm site and a 2-hour RTO, an orchestrated failover runbook (verify data, promote, repoint) is appropriate rather than instant automatic failover." },
      { label:"Cloud DR model", hint:"DR delivered as a service.", options:["SaaS email","DRaaS (Disaster Recovery as a Service)","IaaS with no replication","FaaS"], answer:1, explain:"Disaster Recovery as a Service provides managed replication and failover orchestration to a provider site, fitting this requirement." }
    ],
    summary:"A 1-hour RPO/2-hour RTO design uses asynchronous replication to a warm site with an orchestrated failover runbook, optionally delivered as DRaaS." },

  { id:"PBQ-017", format:3, domain:2,
    title:"Live Migration and Maintenance",
    brief:"You must patch a hypervisor host with zero guest downtime. Pick the migration capability, the prerequisite shared resource, the cluster feature that keeps VMs balanced, and the safe maintenance step.",
    exhibitTitle:"ha://live-migrate",
    exhibit:"  <span class='cy'>[ Cluster: host1 host2 host3 ]</span>\n  Patch host2 with <span class='ok'>no VM downtime</span>\n  VMs currently on host2: 6\n  Shared datastore visible to all hosts\n  <span class='warnc'>host2 must be emptied first</span>",
    fields:[
      { label:"Migration capability", hint:"Move running VMs live.", options:["Cold migration only","Live migration (vMotion/Live Migration)","Reboot all guests","Restore from backup"], answer:1, explain:"Live migration moves running VMs between hosts with no guest downtime, the core enabler for non-disruptive maintenance." },
      { label:"Prerequisite", hint:"Both hosts must reach the disk.", options:["Local-only datastores","Shared storage reachable by all hosts","Identical VM names","Public internet path"], answer:1, explain:"Live migration requires the destination host to access the same shared datastore so the VM's disk does not move during migration." },
      { label:"Balancing feature", hint:"Auto-distribute load.", options:["Manual placement only","Automated load balancing/DRS across the cluster","Pin every VM to host2","Disable HA"], answer:1, explain:"A cluster resource scheduler (DRS-style) automatically rebalances VMs across hosts, useful after evacuating one host." },
      { label:"Safe maintenance step", hint:"Empty the host first.", options:["Pull power immediately","Place host2 in maintenance mode to evacuate VMs, then patch","Patch with VMs running","Delete the VMs"], answer:1, explain:"Entering maintenance mode evacuates the guests via live migration before the host is patched, guaranteeing no downtime." }
    ],
    summary:"Live migration over shared storage, automated load balancing, and maintenance mode let you evacuate and patch a host with zero guest downtime." },

  { id:"PBQ-018", format:3, domain:2,
    title:"Stretched Storage and Witness",
    brief:"A hyperconverged cluster spans two rooms with a third site holding only a witness. Decide the data placement, the witness role, the failure-domain behavior, and the appropriate availability claim.",
    exhibitTitle:"ha://stretched",
    exhibit:"  <span class='cy'>[ Room A ]</span> <==sync==> <span class='cy'>[ Room B ]</span>\n        \\                     /\n         \\                   /\n          +-- <span class='ok'>Witness (Site C)</span> --+\n  Mirrored data: A + B   |  Witness: metadata only\n  Lose <span class='warnc'>1 room</span> -> stay online",
    fields:[
      { label:"Data placement", hint:"Survive a room loss.", options:["Single copy in Room A","Synchronous mirror across Room A and Room B","Copy only at the witness","No replication"], answer:1, explain:"A synchronous mirror keeps a full, current copy in each room so the cluster survives losing an entire room." },
      { label:"Witness role", hint:"Tie-breaker, not data.", options:["Stores a full data copy","Holds quorum/metadata to break ties only","Runs all VMs","Is the load balancer"], answer:1, explain:"The third-site witness holds only quorum metadata to break ties and prevent split-brain; it does not store the data set." },
      { label:"Failure-domain behavior", hint:"One room down.", options:["Whole cluster offline","Surviving room keeps service via its mirror copy","Data is lost","Manual restore required"], answer:1, explain:"With synchronous mirroring and the witness vote, the surviving room continues serving from its in-sync copy automatically." },
      { label:"Availability design claim", hint:"Removes single site as SPOF.", options:["No redundancy","No single site is a single point of failure","RPO of one week","Backups replace HA"], answer:1, explain:"The stretched mirror plus independent witness removes any single site as a single point of failure, the goal of geo-stretched HA." }
    ],
    summary:"A synchronous cross-room mirror with a third-site witness keeps service running through the loss of one room, eliminating a single site as a point of failure." },

  /* ============== FORMAT 4 : Security Hardening & IAM ================== */

  { id:"PBQ-019", format:4, domain:3,
    title:"Internet-Facing Bastion Hardening",
    brief:"A jump/bastion host is exposed to remote admins. Reduce its attack surface, enforce strong remote access, apply least privilege, and add a control to detect lateral movement.",
    exhibitTitle:"sec://bastion",
    exhibit:"  <span class='cy'>[ bastion-01 ]</span>\n  Open ports found: 22, <span class='warnc'>23 telnet</span>, <span class='warnc'>3389</span>, 80, 445\n  Admin login: <span class='warnc'>password only</span>\n  Local users: 6 in 'Administrators'\n  No central log shipping",
    fields:[
      { label:"Hardening action", hint:"Cleartext remote shell.", options:["Leave all ports open","Disable Telnet (23) and unused services, keep only SSH","Open more ports","Enable FTP too"], answer:1, explain:"Disabling Telnet and other unused services removes cleartext and unnecessary attack surface; SSH provides encrypted remote administration." },
      { label:"IAM control for remote access", hint:"Beyond a password.", options:["Shared admin password","Require MFA for administrator logins","Disable account lockout","Reuse passwords"], answer:1, explain:"Multi-factor authentication on admin logins blocks credential-only attacks even if a password is stolen." },
      { label:"Least-privilege fix", hint:"Six admins is too many.", options:["Add everyone to Administrators","Remove unneeded users from Administrators; grant least privilege","Give all users root","Disable permissions entirely"], answer:1, explain:"Least privilege means only required accounts hold administrative rights; trimming the Administrators group limits blast radius." },
      { label:"Detection control", hint:"Centralize and correlate logs.", options:["Turn logging off","Ship logs to a SIEM for correlation/alerting","Store logs only locally","Delete logs nightly"], answer:1, explain:"Forwarding logs to a SIEM enables correlation and alerting on lateral movement and anomalous admin activity across hosts." }
    ],
    summary:"Harden the bastion by disabling Telnet/unused services, enforcing admin MFA, trimming the Administrators group to least privilege, and shipping logs to a SIEM." },

  { id:"PBQ-020", format:4, domain:3,
    title:"Service Account and Patch Hygiene",
    brief:"An application service runs under an over-privileged shared account on an unpatched server. Fix the service-account model, the patch posture, the credential policy, and malware defense.",
    exhibitTitle:"sec://svc-acct",
    exhibit:"  <span class='cy'>[ app-srv ]</span>\n  Service runs as: <span class='warnc'>Domain Admin</span> (shared)\n  Patches: <span class='warnc'>4 months behind</span>\n  Password: never expires, known to team\n  No endpoint malware protection",
    fields:[
      { label:"Service-account fix", hint:"Scope the account down.", options:["Keep Domain Admin","Use a dedicated least-privilege/managed service account","Use the built-in Administrator","Run as SYSTEM everywhere"], answer:1, explain:"A dedicated least-privilege (ideally managed) service account scoped to only what the app needs eliminates the Domain Admin over-privilege." },
      { label:"Hardening action", hint:"4 months behind.", options:["Skip patches","Apply current security patches via patch management","Disable Windows Update permanently","Patch only yearly"], answer:1, explain:"Timely patching through a managed process closes known vulnerabilities; four months of missing updates is a major exposure." },
      { label:"IAM credential policy", hint:"Shared, non-expiring secret.", options:["Keep it shared and static","Enforce rotation and remove shared knowledge of the secret","Post it in a wiki","Disable expiration"], answer:1, explain:"Service-account secrets should be rotated and not shared among staff; managed/group service accounts can rotate automatically." },
      { label:"Mitigation control", hint:"Endpoint threat defense.", options:["No protection needed","Deploy anti-malware/EDR on the server","Rely on the firewall only","Disable Defender"], answer:1, explain:"Anti-malware/EDR on the host detects and blocks malicious code and is a baseline endpoint mitigation, especially on an exposed app server." }
    ],
    summary:"Replace the Domain Admin service account with a least-privilege managed account, patch promptly, rotate/secure the secret, and deploy anti-malware/EDR." },

  { id:"PBQ-021", format:4, domain:3,
    title:"Data Exfiltration Controls",
    brief:"A file server holds regulated PII. You must prevent unauthorized copying, protect data at rest, restrict access, and detect mass downloads.",
    exhibitTitle:"sec://pii-fs",
    exhibit:"  <span class='cy'>[ pii-fileserver ]</span>\n  Contents: <span class='hl'>regulated PII</span>\n  Volume: <span class='warnc'>unencrypted at rest</span>\n  Shares: 'Everyone - Full Control'\n  Concern: bulk copy to USB / cloud",
    fields:[
      { label:"Exfiltration mitigation", hint:"Block/flag sensitive data egress.", options:["Allow all USB and uploads","Deploy DLP to detect and block sensitive-data egress","Email files to everyone","Disable auditing"], answer:1, explain:"Data Loss Prevention inspects and blocks unauthorized movement of regulated data to USB, email, or cloud destinations." },
      { label:"Data-at-rest hardening", hint:"Volume is unencrypted.", options:["Leave it plaintext","Enable full-disk/volume encryption","Compress the volume","Share over Telnet"], answer:1, explain:"Encrypting the volume at rest protects PII if drives are stolen or improperly decommissioned." },
      { label:"IAM permission fix", hint:"'Everyone Full Control' is wrong.", options:["Keep Everyone-Full","Apply least-privilege NTFS/share ACLs by group","Grant Full Control to all","Remove all permissions so it breaks"], answer:1, explain:"Replacing 'Everyone - Full Control' with least-privilege group-based ACLs restricts PII access to authorized roles only." },
      { label:"Detection control", hint:"Notice bulk reads.", options:["No monitoring","Enable file-access auditing and alert on mass downloads","Trust users blindly","Turn off the SIEM"], answer:1, explain:"Object-access auditing feeding alerts (often via a SIEM) flags abnormal bulk reads that signal exfiltration in progress." }
    ],
    summary:"Protect the PII server with DLP on egress, volume encryption at rest, least-privilege ACLs replacing Everyone-Full, and file-access auditing/alerting." },

  { id:"PBQ-022", format:4, domain:3,
    title:"Privileged Access and Session Control",
    brief:"Admins log in directly with permanent elevated rights. Implement just-in-time elevation, secure the credentials, separate duties, and record privileged sessions.",
    exhibitTitle:"sec://pam",
    exhibit:"  <span class='cy'>[ Admin access model ]</span>\n  Current: <span class='warnc'>standing Domain Admin</span> 24/7\n  Same account used for email + admin\n  No approval for elevation\n  No session recording",
    fields:[
      { label:"IAM elevation model", hint:"Grant rights only when needed.", options:["Permanent admin for all","Just-in-time, time-bound privileged elevation","Disable approvals","Everyone is admin"], answer:1, explain:"Just-in-time, time-bound elevation grants privileged rights only for an approved window, shrinking the standing-privilege attack surface." },
      { label:"Account separation", hint:"Daily vs admin work.", options:["One account for everything","Separate standard and privileged admin accounts","Share one admin login","Use email account to administer"], answer:1, explain:"Separating daily-use and privileged accounts prevents a phished email session from immediately yielding admin rights." },
      { label:"Credential protection", hint:"Where secrets live.", options:["Spreadsheet of passwords","Store/rotate privileged credentials in a vault (PAM)","Sticky notes","Reuse one password"], answer:1, explain:"A privileged-access-management vault stores, rotates, and brokers credentials so secrets are never directly known or reused." },
      { label:"Accountability control", hint:"Prove who did what.", options:["No logging","Record and audit privileged sessions","Disable command history","Anonymous logins"], answer:1, explain:"Recording and auditing privileged sessions provides non-repudiation and forensic evidence of administrative actions." }
    ],
    summary:"Adopt just-in-time elevation, separate admin from daily accounts, vault and rotate privileged credentials, and record/audit privileged sessions." },

  { id:"PBQ-023", format:4, domain:3,
    title:"Hardening a New Web Server Baseline",
    brief:"Apply a secure baseline to a freshly installed web server: remove defaults, restrict the host firewall, secure remote management, and validate against a benchmark.",
    exhibitTitle:"sec://baseline",
    exhibit:"  <span class='cy'>[ new-web ]</span>\n  Default sample site + admin page live\n  Default creds: <span class='warnc'>admin/admin</span>\n  Host firewall: <span class='warnc'>all ports allowed</span>\n  Mgmt: HTTP on :8080 (cleartext)",
    fields:[
      { label:"Remove-defaults action", hint:"Sample app + default page.", options:["Keep sample site","Remove default/sample content and unused modules","Publish the admin page","Leave defaults running"], answer:1, explain:"Removing default sample sites, pages, and unused modules eliminates well-known attack surface present out of the box." },
      { label:"Default-credential fix", hint:"admin/admin.", options:["Keep admin/admin","Change default credentials and disable unused accounts","Share them with the team","Write them on the host"], answer:1, explain:"Default credentials are publicly known; they must be changed and unused accounts disabled before exposure." },
      { label:"Host firewall hardening", hint:"All ports allowed.", options:["Allow everything","Apply default-deny and open only required ports (443)","Disable the firewall","Open all high ports"], answer:1, explain:"A default-deny host firewall that permits only required ports (such as 443) minimizes exposed services." },
      { label:"Secure-management control", hint:"Cleartext :8080.", options:["Keep HTTP management","Use encrypted management (HTTPS/SSH) and restrict source IPs","Disable TLS","Allow any IP to manage"], answer:1, explain:"Management must use encrypted channels (HTTPS/SSH) restricted to admin source networks; cleartext HTTP exposes credentials." }
    ],
    summary:"Baseline the web server by removing default content, changing default creds, applying a default-deny firewall with only 443 open, and using encrypted, source-restricted management." },

  { id:"PBQ-024", format:4, domain:3,
    title:"Account Lifecycle and MFA Gaps",
    brief:"An audit finds orphaned accounts, weak factors, and broad group membership. Remediate stale accounts, strengthen authentication, tighten group rights, and add anomaly detection.",
    exhibitTitle:"sec://iam-audit",
    exhibit:"  <span class='cy'>[ IAM audit findings ]</span>\n  - <span class='warnc'>12 enabled accounts</span> for ex-employees\n  - MFA: SMS only on admins\n  - 'Backup Operators' has <span class='warnc'>40 members</span>\n  - No alerting on impossible-travel logins",
    fields:[
      { label:"Account-lifecycle fix", hint:"Ex-employees still enabled.", options:["Leave them enabled","Disable/remove orphaned accounts via a deprovisioning process","Reset and reuse them","Ignore the finding"], answer:1, explain:"A joiner/mover/leaver deprovisioning process disables and removes orphaned accounts promptly, closing unmonitored entry points." },
      { label:"MFA strengthening", hint:"SMS is phishable/SIM-swappable.", options:["Keep SMS only","Move admins to phishing-resistant MFA (app/FIDO2)","Disable MFA","Use security questions"], answer:1, explain:"SMS is vulnerable to SIM swap and interception; app-based or FIDO2 phishing-resistant factors are stronger for privileged accounts." },
      { label:"Group-rights fix", hint:"40 backup operators.", options:["Add more members","Right-size privileged group membership to least privilege","Grant the group admin","Delete all groups"], answer:1, explain:"Privileged groups like Backup Operators carry powerful rights; membership should be reviewed and limited to those who need it." },
      { label:"Detection control", hint:"Impossible travel.", options:["No monitoring","Enable risk-based sign-in/SIEM alerting on anomalies","Turn off auth logs","Allow all logins"], answer:1, explain:"Risk-based sign-in analytics or SIEM correlation flags impossible-travel and other anomalous logins for response." }
    ],
    summary:"Deprovision orphaned accounts, move admins to phishing-resistant MFA, right-size privileged group membership, and add anomaly-based sign-in alerting." },

  /* ========== FORMAT 5 : Troubleshooting & Disaster Recovery =========== */

  { id:"PBQ-025", format:5, domain:4,
    title:"Server Fails to POST",
    brief:"A server is completely dark after a power event. Read the indicators, identify the root cause, choose the next methodical step, and select the recovery validation.",
    exhibitTitle:"trbl://no-post",
    exhibit:"  <span class='cy'>[ host: no display ]</span>\n  Power LED: <span class='warnc'>off</span>   Fans: not spinning\n  PSU2 amber, PSU1 <span class='warnc'>dark</span>\n  Recent: building power blip\n  Beep codes: none (no POST)",
    fields:[
      { label:"Most likely root cause", hint:"No power, one PSU dark.", options:["Failed OS","Failed PSU / power delivery","DNS misconfiguration","Expired certificate"], answer:1, explain:"No power LED, dead fans, and a dark PSU after a power event point to a power-delivery/PSU fault, not an OS or network issue." },
      { label:"Next troubleshooting step (CompTIA)", hint:"Establish a theory, test it.", options:["Reinstall the OS","Verify power feed and reseat/replace the failed PSU to test the theory","Rebuild the RAID","Change DNS"], answer:1, explain:"After forming the theory (power), the methodology says test it: confirm the feed and reseat or swap the suspect PSU before escalating." },
      { label:"Recovery validation", hint:"Confirm redundancy restored.", options:["Assume it is fine","Confirm both PSUs healthy and test redundancy by pulling one feed","Skip testing","Disable PSU monitoring"], answer:1, explain:"After repair, verify full functionality and that PSU redundancy works by testing failover of a single feed, then document." }
    ],
    summary:"A dark server after a power blip indicates a PSU/power fault; test the theory by checking the feed and reseating/replacing the PSU, then validate redundancy." },

  { id:"PBQ-026", format:5, domain:4,
    title:"Degraded Array and Backup Strategy",
    brief:"A RAID 5 array reports a failed member and a hot spare rebuilding. Identify the state, choose the immediate safe action, and verify the backup/restore posture in case of a second failure.",
    exhibitTitle:"trbl://degraded",
    exhibit:"  <span class='cy'>[ array0 status ]</span>\n  State: <span class='warnc'>DEGRADED</span>  (RAID 5)\n  d2: <span class='warnc'>FAILED</span>   spare: <span class='hl'>REBUILDING 38%</span>\n  Last full backup: Sunday\n  Nightly: incrementals Mon-Sat",
    fields:[
      { label:"Root-cause / state read", hint:"One member lost.", options:["Total data loss already","Single-disk failure, array degraded but online","Network outage","Bad VLAN"], answer:1, explain:"RAID 5 tolerates one disk; with d2 failed and the spare rebuilding, the array is degraded but still serving data." },
      { label:"Immediate safe action", hint:"Protect during rebuild.", options:["Pull another disk to test","Let the rebuild finish and ensure a current backup exists before any further changes","Reboot repeatedly","Delete the array"], answer:1, explain:"During a degraded rebuild a second failure is fatal, so avoid risky changes, let the rebuild complete, and confirm backups are current." },
      { label:"Backup type that limits restore steps", hint:"Full + which nightly?", options:["Differential each night (full + latest differential)","Many incrementals only","No backup","Mirror only"], answer:0, explain:"A differential restore needs only the last full plus the most recent differential, fewer media and steps than chaining many incrementals if a full restore is needed." },
      { label:"Recovery confidence step", hint:"Backups must be proven.", options:["Trust backups untested","Perform a periodic restore test to verify recoverability","Delete old backups","Disable backup logs"], answer:1, explain:"Only a tested restore proves the backups are usable; recovery testing is required to trust the DR posture before relying on it." }
    ],
    summary:"The RAID 5 array is degraded but online; let the spare rebuild, confirm a current (ideally differential) backup, and validate recoverability with a restore test." },

  { id:"PBQ-027", format:5, domain:4,
    title:"Intermittent Network Drops",
    brief:"A server intermittently loses connectivity under load. Use the symptom log to find the cause, pick the next diagnostic step, and decide the safe change-control action.",
    exhibitTitle:"trbl://net-drop",
    exhibit:"  <span class='cy'>[ srv-net log ]</span>\n  10:02 link <span class='warnc'>down</span> 10:02 link up (flapping)\n  NIC errors: <span class='warnc'>CRC + late collisions rising</span>\n  Speed/duplex: <span class='warnc'>half-duplex</span> on switch port\n  Cable: reused, untested",
    fields:[
      { label:"Most likely root cause", hint:"CRC + collisions + half-duplex.", options:["DNS failure","Duplex mismatch / physical-layer fault","RAID failure","Expired license"], answer:1, explain:"Rising CRC errors, late collisions, and a half-duplex port are classic signs of a duplex mismatch or a bad cable, a physical/data-link issue." },
      { label:"Next troubleshooting step (CompTIA)", hint:"Test one variable at a time.", options:["Reinstall the OS","Set both ends to matching auto/duplex and replace/test the cable","Rebuild AD","Reformat the disk"], answer:1, explain:"Correct the duplex setting on both ends and swap in a known-good tested cable, isolating one variable at a time per the methodology." },
      { label:"Change-control action", hint:"Document and verify.", options:["Make many changes at once","Apply one change, verify full functionality, then document","Skip documentation","Reboot randomly"], answer:1, explain:"Make a single controlled change, confirm the symptom is resolved with full functionality restored, and document the fix and lessons learned." }
    ],
    summary:"Flapping links with CRC/collisions and half-duplex indicate a duplex mismatch or bad cable; fix duplex on both ends, replace/test the cable, then verify and document." },

  { id:"PBQ-028", format:5, domain:4,
    title:"Ransomware Recovery Decision",
    brief:"Files across a server are encrypted with a ransom note. Choose the correct first containment step, the recovery source, and the backup design that defeats this attack.",
    exhibitTitle:"trbl://ransom",
    exhibit:"  <span class='cy'>[ incident ]</span>\n  Files: <span class='warnc'>.locked extension</span> + ransom note\n  Spread: shares on srv-fs reachable network-wide\n  Backups: nightly to <span class='hl'>NAS</span> + monthly <span class='ok'>offline copy</span>\n  Note demands payment for key",
    fields:[
      { label:"First containment step", hint:"Stop the spread.", options:["Pay the ransom","Isolate the affected host from the network","Reboot and ignore","Encrypt more files"], answer:1, explain:"Containment comes first: isolate the infected system from the network to stop lateral encryption before recovery begins." },
      { label:"Recovery source", hint:"What can ransomware not reach?", options:["The encrypted live files","A clean offline/immutable backup copy","The ransom decryptor","The NAS if it was also encrypted"], answer:1, explain:"Recover from a known-clean offline or immutable backup that ransomware could not reach or alter; never rely on paying for a key." },
      { label:"Backup design that defeats this", hint:"3-2-1 with offline copy.", options:["Single online NAS only","3-2-1 backups including an offline/air-gapped or immutable copy","No backups","Backups on the same share"], answer:1, explain:"A 3-2-1 strategy with at least one offline/air-gapped or immutable copy ensures a recoverable backup survives an attack that reaches online storage." },
      { label:"Validation before declaring recovery", hint:"Prove the restore.", options:["Assume restore worked","Restore to a clean system and verify data integrity and that malware is absent","Skip scanning","Reconnect immediately"], answer:1, explain:"Restore to a rebuilt/clean system, verify data integrity, and confirm the malware is eradicated before returning the host to service." }
    ],
    summary:"Isolate the host first, recover from a clean offline/immutable backup (never pay), rely on a 3-2-1 design, and validate integrity on a clean system before restoring service." },

  { id:"PBQ-029", format:5, domain:4,
    title:"Server Overheating and Shutdowns",
    brief:"A server randomly shuts down under load with thermal alarms. Identify the cause from sensor data, pick the next physical step, and confirm environmental DR controls.",
    exhibitTitle:"trbl://thermal",
    exhibit:"  <span class='cy'>[ ipmi sensors ]</span>\n  CPU temp: <span class='warnc'>92C rising</span>  Inlet: <span class='warnc'>34C</span>\n  Fan3: <span class='warnc'>0 RPM</span>   others ~high RPM\n  Event: thermal shutdown x3 today\n  Rack: front of row, near closed door",
    fields:[
      { label:"Most likely root cause", hint:"Dead fan + high inlet.", options:["Software bug","Cooling/airflow failure (dead fan + hot intake)","DNS issue","RAID error"], answer:1, explain:"A 0-RPM fan, high inlet temperature, and thermal shutdowns indicate a cooling/airflow failure, a hardware and environmental problem." },
      { label:"Next troubleshooting step (CompTIA)", hint:"Address the failed component.", options:["Reinstall the OS","Replace the failed fan and clear airflow blockage, then recheck temps","Rebuild AD","Reformat disks"], answer:1, explain:"Replace the dead fan, restore airflow (dust, blanking panels, intake), and verify temperatures return to normal under load." },
      { label:"Environmental DR control", hint:"Protect against room heat.", options:["Ignore room cooling","Verify HVAC/redundant cooling and temperature monitoring/alerting in the room","Raise the thermostat","Disable sensors"], answer:1, explain:"DR readiness includes redundant room cooling and temperature monitoring with alerts so an HVAC failure is caught before equipment overheats." }
    ],
    summary:"Thermal shutdowns with a dead fan and hot intake mean a cooling/airflow failure; replace the fan, restore airflow, and verify HVAC/redundant cooling and alerting." },

  { id:"PBQ-030", format:5, domain:4,
    title:"Failover Test Did Not Cut Over",
    brief:"During a planned DR drill the secondary site did not take over and an application stayed down. Diagnose the failover gap, choose the corrective step, and harden the DR validation process.",
    exhibitTitle:"trbl://dr-drill",
    exhibit:"  <span class='cy'>[ DR drill result ]</span>\n  Primary powered off (planned)\n  Secondary: data replicated <span class='ok'>OK</span>\n  App stayed <span class='warnc'>DOWN</span> at DR site\n  Found: <span class='warnc'>DNS/VIP still points to primary</span>\n  Runbook: last tested 14 months ago",
    fields:[
      { label:"Root cause of the failed cutover", hint:"Data was fine; clients could not reach DR.", options:["Disk failure","Failover orchestration gap - clients still pointed at primary (DNS/VIP not repointed)","Bad RAID","Expired TLS only"], answer:1, explain:"Replication worked but the cutover did not repoint DNS/the VIP to the DR site, so clients never reached the recovered app, a failover-orchestration gap." },
      { label:"Corrective step", hint:"Complete the cutover.", options:["Do nothing","Update DNS/VIP to the DR endpoint and lower DNS TTLs for fast cutover","Delete replication","Power off the DR site"], answer:1, explain:"Repointing DNS/the VIP to the DR endpoint (with low TTLs so the change propagates quickly) completes the failover so clients reach the recovered service." },
      { label:"Process hardening", hint:"14 months since last test.", options:["Never test again","Schedule regular DR failover tests and keep the runbook current","Test once a decade","Skip documentation"], answer:1, explain:"Regular, scheduled DR tests with an up-to-date runbook catch orchestration gaps like this one before a real disaster, validating RTO/RPO." }
    ],
    summary:"The DR drill failed because DNS/VIP was never repointed despite good replication; fix the cutover with low-TTL DNS/VIP updates and institute regular, documented DR failover tests." }

);
