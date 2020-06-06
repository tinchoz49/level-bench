# level-bench

## Usage

```
$ git clone https://github.com/tinchoz49/level-bench
$ cd level-bench
$ npm install
$ npm run benchmark:node
$ npm run benchmark:browser
$ MICROTASK=1 npm run benchmark:browser
```

## Results

### Node

```
# level: read by get
ok ~18 ms (0 s + 17847146 ns)

# level: createReadStream
ok ~17 ms (0 s + 16594899 ns)

# level-mem: read by get
ok ~17 ms (0 s + 16674587 ns)

# level-mem: createReadStream
ok ~9.37 ms (0 s + 9367946 ns)

wins: level-mem: createReadStream
ok ~103 ms (0 s + 102973869 ns)
```

### Browser

```
# level: read by get
ok ~296 ms (0 s + 295730000 ns)

# level: createReadStream
ok ~4.52 s (4 s + 523419999 ns)

# level-mem: read by get
ok ~402 ms (0 s + 402440000 ns)

# level-mem: createReadStream
ok ~4.46 s (4 s + 456030000 ns)

wins: level: read by get
ok ~9.87 s (9 s + 869610000 ns)
```

### Browser with nextTick using queueMicrotask

```
# level: read by get
ok ~535 ms (0 s + 534795000 ns)

# level: createReadStream
ok ~91 ms (0 s + 90644999 ns)

# level-mem: read by get
ok ~327 ms (0 s + 326570000 ns)

# level-mem: createReadStream
ok ~76 ms (0 s + 75775000 ns)

wins: level-mem: createReadStream
ok ~1.46 s (1 s + 462025001 ns)
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