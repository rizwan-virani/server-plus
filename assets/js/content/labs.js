window.LABS = [
  {
    "id": "Lab 01",
    "num": 1,
    "group": "SERVER HARDWARE",
    "title": "Racking and Cabling a Rack-Mount Server",
    "desc": "Install a 2U server into a standard 42U rack and dress its power and data cabling for airflow and serviceability. You confirm rail-unit sizing, select redundant power feeds, and validate physical connectivity from the console.",
    "objectives": [
      "Determine correct rail and U-space sizing for a chassis.",
      "Apply A/B power feed redundancy and proper cable management.",
      "Verify physical link and management connectivity after racking."
    ],
    "console": {
      "host": "srv-lab01",
      "boot": [
        "[SYS] Data center provisioning console online.",
        "[SYS] Chassis detected: 2U dual-PSU server, idle."
      ],
      "tasks": [
        { "id": "t1", "label": "Select the rail kit matching a 2U chassis" },
        { "id": "t2", "label": "Choose a redundant power feed arrangement" },
        { "id": "t3", "label": "Seat the chassis and connect cabling" },
        { "id": "t4", "label": "Verify physical link status" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Rail kit and U-height for this chassis",
          "options": ["1U fixed rails", "2U sliding rails", "4U fixed shelf", "Tower stand"],
          "correct": "2U sliding rails",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Power feed plan for PSU redundancy",
          "options": ["Both PSUs on PDU-A", "PSU1 on PDU-A, PSU2 on PDU-B", "Single PSU only", "Daisy-chain PDUs"],
          "correct": "PSU1 on PDU-A, PSU2 on PDU-B",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "SEAT CHASSIS AND CABLE",
        "placeholder": "rack U22-U23",
        "button": "Apply",
        "response": "[RACK] Chassis seated at U22-U23, rails locked.\n[RACK] PSU1->PDU-A, PSU2->PDU-B confirmed.\n[RACK] Data and mgmt cables dressed to side channel.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show link",
          "out": "[NIC] eth0 link UP 10GbE\n[BMC] mgmt port link UP 1GbE\n[PWR] PSU1 OK, PSU2 OK (redundant)",
          "task": "t4"
        },
        { "cmd": "show inventory", "out": "[HW] 2U chassis, 2x PSU 800W, 8x 2.5in bays" },
        { "cmd": "show status", "out": "Chassis nominal." }
      ]
    }
  },
  {
    "id": "Lab 02",
    "num": 2,
    "group": "SERVER HARDWARE",
    "title": "Building a RAID 5 Array and Calculating Capacity",
    "desc": "Create a fault-tolerant RAID 5 array on a hardware controller and compute usable capacity after parity overhead. You select the RAID level, set stripe parameters, initialize the array, and confirm the resulting logical volume size.",
    "objectives": [
      "Choose a RAID level balancing capacity, performance, and tolerance.",
      "Calculate usable capacity given N disks and single parity.",
      "Initialize and verify a healthy logical drive."
    ],
    "console": {
      "host": "srv-lab02",
      "boot": [
        "[SYS] RAID controller utility online.",
        "[SYS] 5x 4TB SAS drives detected, unconfigured."
      ],
      "tasks": [
        { "id": "t1", "label": "Select a single-parity fault-tolerant RAID level" },
        { "id": "t2", "label": "Pick the correct usable capacity for 5x 4TB" },
        { "id": "t3", "label": "Initialize the array" },
        { "id": "t4", "label": "Verify logical drive health" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "RAID level with single distributed parity",
          "options": ["RAID 0", "RAID 1", "RAID 5", "RAID 10"],
          "correct": "RAID 5",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Usable capacity for 5x 4TB in RAID 5",
          "options": ["20 TB", "16 TB", "12 TB", "8 TB"],
          "correct": "16 TB",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "INITIALIZE ARRAY",
        "placeholder": "stripe=256KB",
        "button": "Apply",
        "response": "[RAID] Creating RAID 5 across 5 drives.\n[RAID] Parity initialized, 256KB stripe.\n[RAID] Logical drive LD0 = 16TB usable, Optimal.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show ld0",
          "out": "[RAID] LD0 RAID 5 state: Optimal\n[RAID] Members: 5 online, 0 failed\n[RAID] Usable: 16TB, parity: 1 disk",
          "task": "t4"
        },
        { "cmd": "show pd", "out": "[RAID] 5 physical drives Online, no predictive failures" },
        { "cmd": "show status", "out": "Controller nominal." }
      ]
    }
  },
  {
    "id": "Lab 03",
    "num": 3,
    "group": "SERVER HARDWARE",
    "title": "Configuring Out-of-Band Management (iDRAC/IPMI)",
    "desc": "Enable lights-out management so the server can be administered when the OS is down. You assign a dedicated BMC IP, enable IPMI-over-LAN, set an admin credential, and confirm remote KVM and sensor access.",
    "objectives": [
      "Differentiate in-band from out-of-band management.",
      "Assign and isolate a dedicated BMC management address.",
      "Validate remote power control and sensor telemetry."
    ],
    "console": {
      "host": "srv-lab03",
      "boot": [
        "[SYS] Baseboard management controller setup online.",
        "[SYS] BMC firmware loaded, network unconfigured."
      ],
      "tasks": [
        { "id": "t1", "label": "Select the dedicated management port mode" },
        { "id": "t2", "label": "Choose an isolated management subnet IP" },
        { "id": "t3", "label": "Enable IPMI-over-LAN with credentials" },
        { "id": "t4", "label": "Verify remote sensor and power access" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "NIC mode for out-of-band access",
          "options": ["Shared LOM with host", "Dedicated BMC port", "Disabled", "USB tether"],
          "correct": "Dedicated BMC port",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Management IP on isolated VLAN",
          "options": ["10.10.50.21 (mgmt VLAN)", "192.168.1.5 (user LAN)", "0.0.0.0", "169.254.10.1 (APIPA)"],
          "correct": "10.10.50.21 (mgmt VLAN)",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "ENABLE IPMI-OVER-LAN",
        "placeholder": "user=admin priv=ADMINISTRATOR",
        "button": "Apply",
        "response": "[BMC] IPMI 2.0 over LAN enabled.\n[BMC] Admin account provisioned, cipher suite 17.\n[BMC] Virtual KVM and SOL available.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "ipmitool sensor",
          "out": "[IPMI] Inlet Temp 22C ok\n[IPMI] PSU1 Status Present ok\n[IPMI] Chassis Power: On",
          "task": "t4"
        },
        { "cmd": "ipmitool power status", "out": "[IPMI] Chassis Power is on" },
        { "cmd": "show status", "out": "BMC nominal." }
      ]
    }
  },
  {
    "id": "Lab 04",
    "num": 4,
    "group": "SERVER HARDWARE",
    "title": "Configuring a UPS and Power Redundancy",
    "desc": "Protect a server against power loss by sizing a UPS and enabling graceful shutdown. You calculate VA load, select redundant feeds, configure shutdown thresholds, and validate runtime and self-test results.",
    "objectives": [
      "Size UPS VA/runtime against measured server load.",
      "Configure low-battery graceful shutdown thresholds.",
      "Validate self-test and estimated runtime."
    ],
    "console": {
      "host": "srv-lab04",
      "boot": [
        "[SYS] Power management console online.",
        "[SYS] UPS attached via USB/network card."
      ],
      "tasks": [
        { "id": "t1", "label": "Select a UPS topology for sensitive loads" },
        { "id": "t2", "label": "Set the graceful shutdown battery threshold" },
        { "id": "t3", "label": "Apply runtime and shutdown configuration" },
        { "id": "t4", "label": "Verify UPS self-test and runtime" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "UPS topology for servers",
          "options": ["Standby (offline)", "Line-interactive", "Online double-conversion", "Surge strip only"],
          "correct": "Online double-conversion",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Initiate graceful shutdown at battery level",
          "options": ["At 0% (full drain)", "At 20% remaining", "Never shut down", "At 95% remaining"],
          "correct": "At 20% remaining",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "APPLY POWER POLICY",
        "placeholder": "load=540VA shutdown=20%",
        "button": "Apply",
        "response": "[UPS] Load 540VA of 1500VA capacity.\n[UPS] Graceful shutdown set at 20% battery.\n[UPS] Estimated runtime at load: 28 min.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "upsc self-test",
          "out": "[UPS] Self-test: PASS\n[UPS] Battery: 100%, runtime 28m\n[UPS] Input 120V, output 120V nominal",
          "task": "t4"
        },
        { "cmd": "upsc status", "out": "[UPS] Online, On Line Power, no alarms" },
        { "cmd": "show status", "out": "UPS nominal." }
      ]
    }
  },
  {
    "id": "Lab 05",
    "num": 5,
    "group": "SERVER HARDWARE",
    "title": "Provisioning Shared iSCSI Storage",
    "desc": "Present block storage from a SAN to a server over IP using iSCSI. You create a target and LUN, configure the initiator IQN, enable CHAP authentication, and confirm the session and new disk.",
    "objectives": [
      "Distinguish iSCSI target, LUN, and initiator roles.",
      "Configure CHAP authentication for an iSCSI session.",
      "Verify an active session and presented block device."
    ],
    "console": {
      "host": "srv-lab05",
      "boot": [
        "[SYS] iSCSI provisioning console online.",
        "[SYS] SAN reachable at 10.20.0.10:3260."
      ],
      "tasks": [
        { "id": "t1", "label": "Select the block protocol for IP SANs" },
        { "id": "t2", "label": "Choose the authentication method for the session" },
        { "id": "t3", "label": "Log in the initiator to the target" },
        { "id": "t4", "label": "Verify the active session and LUN" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Protocol presenting block LUNs over IP",
          "options": ["NFS", "SMB/CIFS", "iSCSI", "FTP"],
          "correct": "iSCSI",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Authentication for the iSCSI session",
          "options": ["None (open)", "CHAP", "Kerberos only", "WEP"],
          "correct": "CHAP",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "LOGIN INITIATOR",
        "placeholder": "iqn.2026-06.lab:srv05",
        "button": "Apply",
        "response": "[iSCSI] Discovery to 10.20.0.10 complete.\n[iSCSI] CHAP authentication succeeded.\n[iSCSI] Logged in to target tgt0, LUN0 attached.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "iscsiadm session",
          "out": "[iSCSI] Session: tcp [1] 10.20.0.10:3260\n[iSCSI] Target: iqn.2026-06.san:tgt0\n[BLK] /dev/sdb 500GB now present",
          "task": "t4"
        },
        { "cmd": "show luns", "out": "[iSCSI] LUN0 500GB mapped to initiator srv05" },
        { "cmd": "show status", "out": "iSCSI nominal." }
      ]
    }
  },
  {
    "id": "Lab 06",
    "num": 6,
    "group": "SERVER ADMINISTRATION",
    "title": "Installing a Server OS with GPT Partitioning",
    "desc": "Perform a clean server OS install on a UEFI system using GPT partitioning. You select the partition table type, lay out an EFI system partition and root, complete installation, and verify the boot mode.",
    "objectives": [
      "Choose GPT vs MBR for large-disk UEFI installs.",
      "Lay out required EFI and OS partitions correctly.",
      "Confirm the system booted in UEFI mode."
    ],
    "console": {
      "host": "srv-lab06",
      "boot": [
        "[SYS] OS installer environment online.",
        "[SYS] Target disk: 2TB NVMe, UEFI firmware."
      ],
      "tasks": [
        { "id": "t1", "label": "Select the partition table for a 2TB UEFI disk" },
        { "id": "t2", "label": "Choose the first required partition" },
        { "id": "t3", "label": "Write partitions and install the OS" },
        { "id": "t4", "label": "Verify UEFI boot mode" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Partition table for 2TB UEFI install",
          "options": ["MBR", "GPT", "exFAT", "RAW"],
          "correct": "GPT",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Required partition for UEFI boot",
          "options": ["EFI system partition (FAT32)", "Linux swap only", "Extended partition", "No system partition"],
          "correct": "EFI system partition (FAT32)",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "WRITE LAYOUT AND INSTALL",
        "placeholder": "ESP=512MB root=rest",
        "button": "Apply",
        "response": "[INST] GPT table written to /dev/nvme0n1.\n[INST] ESP 512MB FAT32, root partition created.\n[INST] OS files copied, bootloader installed.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show boot",
          "out": "[BOOT] Firmware mode: UEFI\n[BOOT] ESP mounted at /boot/efi\n[BOOT] GPT GUID partition table valid",
          "task": "t4"
        },
        { "cmd": "lsblk", "out": "[DISK] nvme0n1: ESP 512M, root 1.9T" },
        { "cmd": "show status", "out": "Install nominal." }
      ]
    }
  },
  {
    "id": "Lab 07",
    "num": 7,
    "group": "SERVER ADMINISTRATION",
    "title": "Configuring DNS and DHCP Services",
    "desc": "Provide name resolution and addressing for a subnet. You create a forward zone with an A record, define a DHCP scope with options, authorize the service, and confirm clients resolve and lease correctly.",
    "objectives": [
      "Create a forward lookup zone and host record.",
      "Define a DHCP scope, range, and core options.",
      "Verify resolution and lease assignment."
    ],
    "console": {
      "host": "srv-lab07",
      "boot": [
        "[SYS] Network services console online.",
        "[SYS] Roles available: DNS, DHCP."
      ],
      "tasks": [
        { "id": "t1", "label": "Select the record type mapping a name to IPv4" },
        { "id": "t2", "label": "Choose the DHCP option carrying the gateway" },
        { "id": "t3", "label": "Apply zone and scope configuration" },
        { "id": "t4", "label": "Verify resolution and a lease" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "DNS record for name-to-IPv4",
          "options": ["A record", "MX record", "PTR record", "TXT record"],
          "correct": "A record",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "DHCP option for default gateway",
          "options": ["Option 3 (router)", "Option 6 (DNS)", "Option 15 (domain)", "Option 51 (lease)"],
          "correct": "Option 3 (router)",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "APPLY DNS AND DHCP",
        "placeholder": "zone=lab.local scope=10.0.0.0/24",
        "button": "Apply",
        "response": "[DNS] Zone lab.local created, A record srv->10.0.0.5.\n[DHCP] Scope 10.0.0.100-200, opt3=10.0.0.1, opt6=10.0.0.5.\n[DHCP] Service authorized and active.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "nslookup srv.lab.local",
          "out": "[DNS] Server: 10.0.0.5\n[DNS] Name: srv.lab.local\n[DNS] Address: 10.0.0.5",
          "task": "t4"
        },
        { "cmd": "show leases", "out": "[DHCP] 10.0.0.101 leased to 00:1a:2b active" },
        { "cmd": "show status", "out": "Network services nominal." }
      ]
    }
  },
  {
    "id": "Lab 08",
    "num": 8,
    "group": "SERVER ADMINISTRATION",
    "title": "Configuring VLANs and NIC Teaming",
    "desc": "Segment traffic and add link resilience on a server. You tag VLANs on a trunk, bond two NICs into a team, select the load-balancing mode, and verify the aggregated link and VLAN reachability.",
    "objectives": [
      "Configure 802.1Q VLAN tagging on a trunk port.",
      "Bond NICs with an appropriate teaming mode.",
      "Verify team status and per-VLAN connectivity."
    ],
    "console": {
      "host": "srv-lab08",
      "boot": [
        "[SYS] Network interface console online.",
        "[SYS] eth0 and eth1 detected, both 10GbE."
      ],
      "tasks": [
        { "id": "t1", "label": "Select the VLAN tagging standard" },
        { "id": "t2", "label": "Choose a teaming mode with switch LACP" },
        { "id": "t3", "label": "Apply the team and VLAN config" },
        { "id": "t4", "label": "Verify the team and VLAN links" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "VLAN tagging standard",
          "options": ["802.1Q", "802.11ac", "802.3af", "802.1X"],
          "correct": "802.1Q",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Teaming mode matching switch LACP",
          "options": ["LACP (802.3ad)", "Active-backup only", "Round-robin no switch config", "Broadcast all"],
          "correct": "LACP (802.3ad)",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "APPLY TEAM AND VLANS",
        "placeholder": "bond0=eth0,eth1 vlans=10,20",
        "button": "Apply",
        "response": "[NIC] bond0 created from eth0+eth1 (LACP).\n[NIC] VLAN 10 and VLAN 20 tagged on bond0.\n[NIC] Aggregate bandwidth: 20Gbps.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show bond0",
          "out": "[NIC] bond0 mode 802.3ad, 2 slaves active\n[NIC] vlan10 UP, vlan20 UP\n[NIC] LACP partner negotiated",
          "task": "t4"
        },
        { "cmd": "show vlans", "out": "[NIC] VLAN 10 mgmt, VLAN 20 data tagged" },
        { "cmd": "show status", "out": "Teaming nominal." }
      ]
    }
  },
  {
    "id": "Lab 09",
    "num": 9,
    "group": "SERVER ADMINISTRATION",
    "title": "Building a High-Availability Failover Cluster",
    "desc": "Cluster two nodes so a workload survives a node failure. You validate prerequisites, select a quorum model, add shared storage, and confirm the role fails over to the surviving node.",
    "objectives": [
      "Choose an appropriate cluster quorum model.",
      "Add shared storage and a clustered role.",
      "Validate automatic failover behavior."
    ],
    "console": {
      "host": "srv-lab09",
      "boot": [
        "[SYS] Failover cluster manager online.",
        "[SYS] Nodes node1 and node2 reachable."
      ],
      "tasks": [
        { "id": "t1", "label": "Select a quorum model for a 2-node cluster" },
        { "id": "t2", "label": "Choose the shared resource type" },
        { "id": "t3", "label": "Form the cluster and add the role" },
        { "id": "t4", "label": "Verify failover to the surviving node" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Quorum for a 2-node cluster",
          "options": ["Node majority only", "Node and disk witness", "No quorum", "Manual tiebreak each boot"],
          "correct": "Node and disk witness",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Shared storage type for the cluster",
          "options": ["Local disk per node", "Shared cluster volume (CSV/SAN)", "USB stick", "RAM disk"],
          "correct": "Shared cluster volume (CSV/SAN)",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "FORM CLUSTER",
        "placeholder": "name=cluster1 witness=disk",
        "button": "Apply",
        "response": "[CLU] Cluster cluster1 formed with node1, node2.\n[CLU] Disk witness added, quorum healthy.\n[CLU] Role FileServer1 online on node1.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "failover node1",
          "out": "[CLU] node1 paused/drained\n[CLU] FileServer1 moved to node2\n[CLU] Failover completed, role Online",
          "task": "t4"
        },
        { "cmd": "show cluster", "out": "[CLU] node1 Up, node2 Up, quorum: Node+Disk" },
        { "cmd": "show status", "out": "Cluster nominal." }
      ]
    }
  },
  {
    "id": "Lab 10",
    "num": 10,
    "group": "SERVER ADMINISTRATION",
    "title": "Sizing and Deploying a VM on a Hypervisor",
    "desc": "Provision a virtual machine on a type-1 hypervisor with right-sized resources. You select the hypervisor type, allocate vCPU and memory without overcommit risk, deploy the VM, and confirm it powers on.",
    "objectives": [
      "Distinguish type-1 from type-2 hypervisors.",
      "Right-size vCPU and memory for a workload.",
      "Deploy and verify VM power state and resources."
    ],
    "console": {
      "host": "srv-lab10",
      "boot": [
        "[SYS] Hypervisor management console online.",
        "[SYS] Host: 32 cores, 256GB RAM, 60% free."
      ],
      "tasks": [
        { "id": "t1", "label": "Identify the bare-metal hypervisor type" },
        { "id": "t2", "label": "Select a sane vCPU/memory allocation" },
        { "id": "t3", "label": "Deploy the VM from template" },
        { "id": "t4", "label": "Verify VM power and resources" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Bare-metal hypervisor type",
          "options": ["Type 1 (bare-metal)", "Type 2 (hosted)", "Emulator", "Container runtime"],
          "correct": "Type 1 (bare-metal)",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Resource allocation for a web app VM",
          "options": ["4 vCPU / 8GB RAM", "32 vCPU / 256GB RAM", "0.5 vCPU / 256MB", "64 vCPU / 512GB"],
          "correct": "4 vCPU / 8GB RAM",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "DEPLOY VM",
        "placeholder": "name=web01 cpu=4 mem=8GB",
        "button": "Apply",
        "response": "[VM] Cloning template to web01.\n[VM] Assigned 4 vCPU, 8GB RAM, 60GB disk.\n[VM] Power state: Running, tools active.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show vm web01",
          "out": "[VM] web01 PoweredOn\n[VM] CPU 4 vCPU, Mem 8GB, no overcommit alarm\n[VM] Host headroom: 18 cores free",
          "task": "t4"
        },
        { "cmd": "show hosts", "out": "[VM] Host esx1 healthy, 60% resources free" },
        { "cmd": "show status", "out": "Hypervisor nominal." }
      ]
    }
  },
  {
    "id": "Lab 11",
    "num": 11,
    "group": "SECURITY & DISASTER RECOVERY",
    "title": "Writing a Basic Server Maintenance Script",
    "desc": "Automate a routine server task with a small shell script. You select the correct shebang, add error handling, schedule it with cron, and verify the scheduled job and a successful run.",
    "objectives": [
      "Use a correct interpreter directive and exit handling.",
      "Schedule recurring execution with cron syntax.",
      "Verify the job runs and logs success."
    ],
    "console": {
      "host": "srv-lab11",
      "boot": [
        "[SYS] Automation shell online.",
        "[SYS] Editing /opt/scripts/cleanup.sh."
      ],
      "tasks": [
        { "id": "t1", "label": "Select the correct script interpreter line" },
        { "id": "t2", "label": "Choose the cron schedule for nightly 2am" },
        { "id": "t3", "label": "Install and enable the scheduled job" },
        { "id": "t4", "label": "Verify the job and last run" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Shebang for a Bash script",
          "options": ["#!/bin/bash", "// bash", "REM bash", "<?php"],
          "correct": "#!/bin/bash",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Cron expression for 2:00 AM daily",
          "options": ["0 2 * * *", "* * * * 2", "2 0 * * 0", "@hourly"],
          "correct": "0 2 * * *",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "INSTALL CRON JOB",
        "placeholder": "0 2 * * * /opt/scripts/cleanup.sh",
        "button": "Apply",
        "response": "[CRON] Job installed for user root.\n[CRON] Schedule: 0 2 * * * cleanup.sh.\n[SH] set -e enabled, exit codes checked.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "crontab -l; tail cleanup.log",
          "out": "[CRON] 0 2 * * * /opt/scripts/cleanup.sh\n[LOG] 02:00:01 cleanup started\n[LOG] 02:00:04 cleanup OK exit 0",
          "task": "t4"
        },
        { "cmd": "bash -n cleanup.sh", "out": "[SH] Syntax OK, no errors" },
        { "cmd": "show status", "out": "Automation nominal." }
      ]
    }
  },
  {
    "id": "Lab 12",
    "num": 12,
    "group": "SECURITY & DISASTER RECOVERY",
    "title": "Encrypting a Volume and Setting Retention",
    "desc": "Protect data at rest and define how long it is kept. You choose a full-disk encryption method, enable it on a data volume, set a retention policy, and verify the volume is encrypted and unlocked.",
    "objectives": [
      "Select an appropriate data-at-rest encryption method.",
      "Apply a retention policy to stored data.",
      "Verify encryption state and key protection."
    ],
    "console": {
      "host": "srv-lab12",
      "boot": [
        "[SYS] Data protection console online.",
        "[SYS] Volume D: (data) unencrypted."
      ],
      "tasks": [
        { "id": "t1", "label": "Select a full-disk encryption technology" },
        { "id": "t2", "label": "Choose a retention period for backups" },
        { "id": "t3", "label": "Enable encryption on the volume" },
        { "id": "t4", "label": "Verify encryption and key status" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Data-at-rest encryption for the volume",
          "options": ["AES full-disk (BitLocker/LUKS)", "ROT13", "Base64 encoding", "Plaintext with ACL"],
          "correct": "AES full-disk (BitLocker/LUKS)",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Retention policy for backups",
          "options": ["Keep 90 days then expire", "Keep forever, never prune", "Delete after 1 hour", "No retention defined"],
          "correct": "Keep 90 days then expire",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "ENABLE ENCRYPTION",
        "placeholder": "cipher=AES-256-XTS",
        "button": "Apply",
        "response": "[ENC] AES-256-XTS enabled on volume D:.\n[ENC] Recovery key escrowed to key vault.\n[POL] Retention set: 90 days.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show encryption",
          "out": "[ENC] Volume D: Encrypted (AES-256-XTS)\n[ENC] Key protector: TPM + recovery key\n[POL] Retention: 90 days active",
          "task": "t4"
        },
        { "cmd": "show keys", "out": "[ENC] Recovery key escrowed, last rotated today" },
        { "cmd": "show status", "out": "Encryption nominal." }
      ]
    }
  },
  {
    "id": "Lab 13",
    "num": 13,
    "group": "SECURITY & DISASTER RECOVERY",
    "title": "Configuring MFA and Least-Privilege Access",
    "desc": "Tighten administrative access using multi-factor authentication and role scoping. You enable an MFA factor, assign least-privilege roles instead of broad admin, apply the policy, and verify enforcement.",
    "objectives": [
      "Select a strong second authentication factor.",
      "Apply least-privilege role assignment.",
      "Verify MFA enforcement and effective permissions."
    ],
    "console": {
      "host": "srv-lab13",
      "boot": [
        "[SYS] Identity and access console online.",
        "[SYS] Accounts: 12 admins, MFA disabled."
      ],
      "tasks": [
        { "id": "t1", "label": "Select a phishing-resistant MFA factor" },
        { "id": "t2", "label": "Choose least-privilege role assignment" },
        { "id": "t3", "label": "Apply MFA and role policy" },
        { "id": "t4", "label": "Verify enforcement and permissions" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Second factor for admin login",
          "options": ["FIDO2 hardware token", "Security question", "Shared admin password", "Email-only login"],
          "correct": "FIDO2 hardware token",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Permission assignment model",
          "options": ["Everyone Domain Admin", "Least-privilege role-based access", "Disable all auditing", "Local admin for all users"],
          "correct": "Least-privilege role-based access",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "APPLY ACCESS POLICY",
        "placeholder": "mfa=fido2 rbac=scoped",
        "button": "Apply",
        "response": "[IAM] MFA (FIDO2) required for all admins.\n[IAM] Broad admin removed, scoped roles assigned.\n[IAM] Conditional access policy active.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show access jdoe",
          "out": "[IAM] jdoe MFA: enforced (FIDO2)\n[IAM] Role: Backup Operator (scoped)\n[IAM] Domain Admin: removed",
          "task": "t4"
        },
        { "cmd": "show policy", "out": "[IAM] MFA required, sessions 8h, RBAC enabled" },
        { "cmd": "show status", "out": "IAM nominal." }
      ]
    }
  },
  {
    "id": "Lab 14",
    "num": 14,
    "group": "SECURITY & DISASTER RECOVERY",
    "title": "Hardening a Server (Services and Patching)",
    "desc": "Reduce attack surface by disabling unneeded services and applying patches. You identify a risky legacy service, set a patch policy, apply hardening, and verify the service is off and the system is current.",
    "objectives": [
      "Identify and disable unnecessary or insecure services.",
      "Establish a regular patching cadence.",
      "Verify reduced surface and patch level."
    ],
    "console": {
      "host": "srv-lab14",
      "boot": [
        "[SYS] Hardening console online.",
        "[SYS] Baseline scan: Telnet and SMBv1 enabled."
      ],
      "tasks": [
        { "id": "t1", "label": "Select the insecure service to disable" },
        { "id": "t2", "label": "Choose a sound patch management cadence" },
        { "id": "t3", "label": "Apply hardening and patches" },
        { "id": "t4", "label": "Verify service state and patch level" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Service to disable for hardening",
          "options": ["SMBv1 / Telnet", "SSHv2", "TLS 1.2", "NTP"],
          "correct": "SMBv1 / Telnet",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Patch management cadence",
          "options": ["Test then apply monthly + critical out-of-band", "Never patch production", "Auto-apply untested to prod", "Patch once a year"],
          "correct": "Test then apply monthly + critical out-of-band",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "APPLY HARDENING",
        "placeholder": "disable=smb1,telnet patch=now",
        "button": "Apply",
        "response": "[HARD] SMBv1 and Telnet disabled.\n[HARD] Unused ports closed in host firewall.\n[PATCH] 14 security updates applied, reboot pending.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show hardening",
          "out": "[HARD] SMBv1: Disabled, Telnet: Disabled\n[PATCH] OS patch level: current (0 missing critical)\n[FW] Default-deny inbound enforced",
          "task": "t4"
        },
        { "cmd": "show services", "out": "[HARD] Only required services running" },
        { "cmd": "show status", "out": "Hardening nominal." }
      ]
    }
  },
  {
    "id": "Lab 15",
    "num": 15,
    "group": "SECURITY & DISASTER RECOVERY",
    "title": "Securely Decommissioning Media (NIST 800-88)",
    "desc": "Retire storage media so data cannot be recovered, following NIST SP 800-88 sanitization guidance. You select the correct sanitization method for the media type, execute it, generate a certificate, and verify completion.",
    "objectives": [
      "Map NIST 800-88 Clear/Purge/Destroy to media types.",
      "Execute the appropriate sanitization action.",
      "Produce a verifiable certificate of sanitization."
    ],
    "console": {
      "host": "srv-lab15",
      "boot": [
        "[SYS] Media sanitization console online.",
        "[SYS] Target: 1TB SSD slated for reuse off-site."
      ],
      "tasks": [
        { "id": "t1", "label": "Select the NIST 800-88 method for SSD reuse" },
        { "id": "t2", "label": "Choose the action for media leaving control" },
        { "id": "t3", "label": "Execute sanitization" },
        { "id": "t4", "label": "Verify and produce a certificate" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "NIST 800-88 method for an SSD",
          "options": ["Cryptographic erase / Purge", "Single-file delete", "Quick format only", "Move to recycle bin"],
          "correct": "Cryptographic erase / Purge",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Action when media leaves the organization",
          "options": ["Purge then verify", "Reuse as-is", "Reformat and ship", "No action needed"],
          "correct": "Purge then verify",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "EXECUTE SANITIZATION",
        "placeholder": "method=crypto-erase",
        "button": "Apply",
        "response": "[SANI] Cryptographic erase issued to SSD.\n[SANI] Media encryption key destroyed.\n[SANI] Purge complete per NIST 800-88.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show sanitization",
          "out": "[SANI] Method: Purge (crypto-erase)\n[SANI] Verification: PASS, no readable data\n[CERT] Certificate of sanitization generated",
          "task": "t4"
        },
        { "cmd": "show cert", "out": "[CERT] Serial, method, date, operator signed" },
        { "cmd": "show status", "out": "Sanitization nominal." }
      ]
    }
  },
  {
    "id": "Lab 16",
    "num": 16,
    "group": "TROUBLESHOOTING",
    "title": "Troubleshooting a Degraded RAID Array",
    "desc": "Diagnose and recover a RAID 5 array running in degraded mode after a disk failure. You identify the failed member, choose the correct recovery action, replace and rebuild, and verify the array returns to optimal.",
    "objectives": [
      "Interpret degraded array status and the failed member.",
      "Select the correct recovery action without data loss.",
      "Verify rebuild progress and return to optimal."
    ],
    "console": {
      "host": "srv-lab16",
      "boot": [
        "[SYS] RAID diagnostics console online.",
        "[ALERT] LD0 state: Degraded, 1 drive failed."
      ],
      "tasks": [
        { "id": "t1", "label": "Identify the array tolerance state" },
        { "id": "t2", "label": "Select the correct recovery action" },
        { "id": "t3", "label": "Replace the disk and start rebuild" },
        { "id": "t4", "label": "Verify rebuild and array health" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Current fault tolerance of the array",
          "options": ["Degraded, 0 further disk failures tolerated", "Optimal, fully redundant", "Failed, total data loss", "Striped, no redundancy"],
          "correct": "Degraded, 0 further disk failures tolerated",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Correct recovery action",
          "options": ["Replace failed disk and rebuild", "Delete and recreate the array", "Pull a second good disk", "Reboot and ignore"],
          "correct": "Replace failed disk and rebuild",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "REPLACE AND REBUILD",
        "placeholder": "slot=3 action=rebuild",
        "button": "Apply",
        "response": "[RAID] New drive inserted in slot 3.\n[RAID] Rebuild started onto replacement.\n[RAID] Parity reconstructing, ETA 2h.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show rebuild",
          "out": "[RAID] Rebuild 100% complete\n[RAID] LD0 state: Optimal\n[RAID] 5 members online, redundancy restored",
          "task": "t4"
        },
        { "cmd": "show pd", "out": "[RAID] Slot 3 new disk Online, others Online" },
        { "cmd": "show status", "out": "Array nominal." }
      ]
    }
  },
  {
    "id": "Lab 17",
    "num": 17,
    "group": "TROUBLESHOOTING",
    "title": "Troubleshooting an OS Boot Failure",
    "desc": "Recover a server that fails to boot after a change. You read the firmware error, identify a missing or corrupt bootloader, repair the boot configuration, and verify the system boots to the OS.",
    "objectives": [
      "Interpret a no-boot firmware error code.",
      "Select the correct boot repair action.",
      "Verify a successful boot to the OS."
    ],
    "console": {
      "host": "srv-lab17",
      "boot": [
        "[SYS] Recovery environment online.",
        "[ERR] No bootable device / bootloader not found."
      ],
      "tasks": [
        { "id": "t1", "label": "Identify the likely boot failure cause" },
        { "id": "t2", "label": "Select the correct repair action" },
        { "id": "t3", "label": "Repair the boot configuration" },
        { "id": "t4", "label": "Verify the OS boots" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Most likely cause of the error",
          "options": ["Missing/corrupt bootloader or wrong boot order", "Failed RAM module", "Expired TLS certificate", "DNS misconfiguration"],
          "correct": "Missing/corrupt bootloader or wrong boot order",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Correct repair action",
          "options": ["Rebuild bootloader and fix boot order", "Reinstall OS from scratch immediately", "Replace the CPU", "Reset BMC password"],
          "correct": "Rebuild bootloader and fix boot order",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "REPAIR BOOT",
        "placeholder": "rebuild-bcd / grub-install",
        "button": "Apply",
        "response": "[BOOT] Boot order corrected to NVMe first.\n[BOOT] Bootloader rewritten to ESP.\n[BOOT] Boot configuration data rebuilt.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "reboot; show boot",
          "out": "[BOOT] POST passed\n[BOOT] Bootloader found on ESP\n[OS] System booted, login prompt ready",
          "task": "t4"
        },
        { "cmd": "show bootorder", "out": "[BOOT] 1:NVMe 2:PXE 3:USB" },
        { "cmd": "show status", "out": "Boot nominal." }
      ]
    }
  },
  {
    "id": "Lab 18",
    "num": 18,
    "group": "TROUBLESHOOTING",
    "title": "Troubleshooting Network Latency and Misconfiguration",
    "desc": "Diagnose intermittent slowness and packet loss between a server and clients. You analyze symptoms, identify a duplex/MTU mismatch, correct the interface settings, and verify clean low-latency connectivity.",
    "objectives": [
      "Use ping/traceroute symptoms to localize a fault.",
      "Identify a duplex or MTU mismatch.",
      "Verify corrected latency and zero loss."
    ],
    "console": {
      "host": "srv-lab18",
      "boot": [
        "[SYS] Network diagnostics console online.",
        "[ALERT] High latency and 6% packet loss on eth0."
      ],
      "tasks": [
        { "id": "t1", "label": "Identify the likely interface-level cause" },
        { "id": "t2", "label": "Select the correct interface setting" },
        { "id": "t3", "label": "Apply the corrected interface config" },
        { "id": "t4", "label": "Verify latency and loss" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Likely cause of loss and latency",
          "options": ["Duplex/MTU mismatch", "Expired DHCP scope", "Wrong DNS suffix", "Disabled SNMP"],
          "correct": "Duplex/MTU mismatch",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Correct eth0 setting",
          "options": ["Auto-negotiate, MTU 1500 matched", "Force 10Mbps half-duplex", "MTU 9000 one side only", "Disable the NIC"],
          "correct": "Auto-negotiate, MTU 1500 matched",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "APPLY INTERFACE FIX",
        "placeholder": "eth0 autoneg=on mtu=1500",
        "button": "Apply",
        "response": "[NIC] eth0 set to auto-negotiate.\n[NIC] Negotiated 1GbE full-duplex.\n[NIC] MTU 1500 matched end to end.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "ping -c4 10.0.0.1",
          "out": "[NET] 4 packets sent, 4 received, 0% loss\n[NET] rtt min/avg/max 0.3/0.4/0.6 ms\n[NIC] eth0 full-duplex, no errors",
          "task": "t4"
        },
        { "cmd": "ethtool eth0", "out": "[NIC] Speed 1000Mb/s, Duplex Full, Auto on" },
        { "cmd": "show status", "out": "Network nominal." }
      ]
    }
  },
  {
    "id": "Lab 19",
    "num": 19,
    "group": "TROUBLESHOOTING",
    "title": "Configuring a 3-2-1 Backup Strategy",
    "desc": "Design a resilient backup scheme following the 3-2-1 rule. You select the copy/media/offsite layout, choose a backup type for the daily job, apply the jobs, and verify backups succeed across locations.",
    "objectives": [
      "Apply the 3-2-1 rule to copies, media, and location.",
      "Choose appropriate full vs incremental scheduling.",
      "Verify successful backups across all targets."
    ],
    "console": {
      "host": "srv-lab19",
      "boot": [
        "[SYS] Backup management console online.",
        "[SYS] Targets: local NAS, LTO tape, cloud bucket."
      ],
      "tasks": [
        { "id": "t1", "label": "Select the layout satisfying 3-2-1" },
        { "id": "t2", "label": "Choose the daily backup type" },
        { "id": "t3", "label": "Apply the backup jobs" },
        { "id": "t4", "label": "Verify backups across targets" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Layout meeting the 3-2-1 rule",
          "options": ["3 copies, 2 media types, 1 offsite", "1 copy on the same disk", "3 copies all on one NAS", "2 copies, same building"],
          "correct": "3 copies, 2 media types, 1 offsite",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Daily job type after weekly full",
          "options": ["Incremental nightly", "Full every hour", "No backups midweek", "Manual copy when remembered"],
          "correct": "Incremental nightly",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "APPLY BACKUP JOBS",
        "placeholder": "full=Sun incr=Mon-Sat",
        "button": "Apply",
        "response": "[BKP] Weekly full to NAS, nightly incrementals.\n[BKP] Copy 2 to LTO tape, copy 3 to cloud bucket.\n[BKP] 3 copies / 2 media / 1 offsite satisfied.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show backups",
          "out": "[BKP] NAS full: SUCCESS\n[BKP] Tape copy: SUCCESS\n[BKP] Cloud offsite copy: SUCCESS (encrypted)",
          "task": "t4"
        },
        { "cmd": "show schedule", "out": "[BKP] Full Sun 01:00, incr Mon-Sat 01:00" },
        { "cmd": "show status", "out": "Backup nominal." }
      ]
    }
  },
  {
    "id": "Lab 20",
    "num": 20,
    "group": "TROUBLESHOOTING",
    "title": "Validating Failover and Recovery (RTO/RPO)",
    "desc": "Test a disaster recovery plan against its objectives. You define RTO and RPO targets, run a failover to the DR site, restore from the most recent backup, and verify recovery met the agreed objectives.",
    "objectives": [
      "Distinguish RTO (time) from RPO (data loss) objectives.",
      "Execute a controlled failover and restore.",
      "Verify measured recovery against RTO/RPO targets."
    ],
    "console": {
      "host": "srv-lab20",
      "boot": [
        "[SYS] DR validation console online.",
        "[SYS] Primary site healthy, DR site standby."
      ],
      "tasks": [
        { "id": "t1", "label": "Identify which objective limits data loss" },
        { "id": "t2", "label": "Select the restore point meeting RPO" },
        { "id": "t3", "label": "Execute failover and restore" },
        { "id": "t4", "label": "Verify recovery against objectives" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Objective that bounds acceptable data loss",
          "options": ["RPO (Recovery Point Objective)", "RTO (Recovery Time Objective)", "MTBF", "SLA uptime percent"],
          "correct": "RPO (Recovery Point Objective)",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Restore point for a 1-hour RPO",
          "options": ["Backup from 20 minutes ago", "Backup from 3 days ago", "Backup from last month", "No restore point"],
          "correct": "Backup from 20 minutes ago",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "EXECUTE DR TEST",
        "placeholder": "failover=DR restore=latest",
        "button": "Apply",
        "response": "[DR] Failover to DR site initiated.\n[DR] Latest backup restored (20 min old).\n[DR] Services online at DR, clients redirected.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show recovery",
          "out": "[DR] Measured RTO: 18 min (target 30 min) PASS\n[DR] Measured RPO: 20 min (target 60 min) PASS\n[DR] Failback plan validated",
          "task": "t4"
        },
        { "cmd": "show dr-site", "out": "[DR] DR site Active, replication healthy" },
        { "cmd": "show status", "out": "DR nominal." }
      ]
    }
  }
];
