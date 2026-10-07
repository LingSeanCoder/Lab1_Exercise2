import wave, struct, math, os

# Tần số các nốt (Hz) — octave 4
NOTES = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25,
    'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99
}

RATE = 44100
DURATION = 0.6

def write_wav(path, samples):
    with wave.open(path, 'w') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        for s in samples:
            w.writeframes(struct.pack('<h', int(max(-1, min(1, s)) * 32767)))

def piano_note(freq, d=DURATION):
    """Tổng hợp âm kiểu piano: fundamental + harmonics + ADSR envelope."""
    n = int(d * RATE)
    samples = []
    for i in range(n):
        t = i / RATE
        # ADSR đơn giản: attack nhanh, decay dài
        attack = min(1, t / 0.01)                # 10ms attack
        decay = math.exp(-t * 3)                  # decay 3/s
        env = attack * decay
        # Harmonics tạo timbre piano
        s = (
            1.00 * math.sin(2 * math.pi * freq * t) +
            0.50 * math.sin(2 * math.pi * freq * 2 * t) +
            0.25 * math.sin(2 * math.pi * freq * 3 * t) +
            0.12 * math.sin(2 * math.pi * freq * 4 * t)
        ) * env / 1.87  # normalize
        samples.append(s)
    return samples

os.makedirs('assets/sounds', exist_ok=True)
for name, freq in NOTES.items():
    write_wav(f'assets/sounds/{name}.wav', piano_note(freq))
    print(f'  {name}.wav  ({freq} Hz)')

print(f'\nDone. {len(NOTES)} note wav files in assets/sounds/')