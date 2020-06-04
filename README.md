# level-bench

## Usage

```
$ git clone https://github.com/tinchoz49/level-bench
$ cd level-bench
$ npm install
$ npm run benchmark:node
$ npm run benchmark:browser
```

## Results

### Node

```
# level: read by get
ok ~23 ms (0 s + 22597062 ns)

# level: createReadStream
ok ~17 ms (0 s + 16784238 ns)

# level-mem: read by get
ok ~16 ms (0 s + 15990506 ns)

# level-mem: createReadStream
ok ~15 ms (0 s + 14724392 ns)

wins: level-mem: createReadStream
ok ~104 ms (0 s + 104342327 ns)
```

### Browser

```
# level: read by get
ok ~286 ms (0 s + 286250001 ns)

# level: createReadStream
ok ~4.45 s (4 s + 452095000 ns)

# level-mem: read by get
ok ~51 ms (0 s + 51350000 ns)

# level-mem: createReadStream
ok ~4.47 s (4 s + 468040000 ns)

wins: level-mem: read by get
ok ~9.46 s (9 s + 463925000 ns)
```

### Hardware used

```
System:    Kernel: 5.6.12-1-MANJARO x86_64 bits: 64 compiler: gcc v: 9.3.0
           Desktop: KDE Plasma 5.18.5 tk: Qt 5.14.2 wm: kwin_x11 dm: SDDM Distro: Manjaro Linux
Machine:   Type: Laptop System: LENOVO product: 20KH002DUS v: ThinkPad X1 Carbon 6th
CPU:       Topology: Quad Core model: Intel Core i5-8350U bits: 64 type: MT MCP arch: Kaby Lake family: 6 model-id: 8E (142)
           stepping: A (10) microcode: CA L2 cache: 6144 KiB
           Speed: 798 MHz min/max: 400/3600 MHz Core speeds (MHz): 1: 800 2: 800 3: 800 4: 800 5: 800 6: 800 7: 800 8: 800
```