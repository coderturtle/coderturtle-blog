---
title: "Heartbeat"
tagline: "Build Raft from scratch in Rust and find out exactly which invariant you got wrong when the simulated network starts lying to you."
summary: >
  MIT 6.5840's real lab order, translated to Rust: an RPC layer, a single-node
  service, then Raft itself (leader election, log replication, persistence,
  log compaction), a fault-tolerant service on top of it, and sharding,
  ending in a synthesis capstone. Every module is graded twice: a
  deterministic tier (a turmoil-simulated network actively working against
  you, not a happy-path test suite) and a conceptual tier from Coachgremlin.
  The shared throughline project is Checkout, a distributed lock and
  session-ownership service real enough that this factory's own git
  worktrees needed one.
status: building
moduleProgress: "3 of 9 modules real (RPC layer, single-node Checkout service, Raft leader election); Modules 04-09 skeleton only"
startDate: 2026-08-29
updatedDate: 2026-08-31
liveUrl: "https://heartbeat.coderturtle.io"
repo: "https://github.com/coderturtle/heartbeat"
order: 5
featured: false
tags: ["distributed-systems", "raft", "rust", "coding-agents"]
---

The sixth workshop in this series, and the first built around a from-scratch
consensus protocol rather than a single-service exercise.
