"""
Crop hero image for desktop and mobile banners.
Uses center-crop to maintain focus on the middle of the image.
"""

from PIL import Image
from pathlib import Path

# Paths
SOURCE = Path("public/herocropped.png")
OUTPUT_DIR = Path("public")

# Target dimensions
DESKTOP = (1920, 480)  # 4:1 ratio
MOBILE = (1080, 540)   # 2:1 ratio


def bottom_right_crop(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    """Crop image from bottom-right to get more grey space, then resize."""
    img_w, img_h = img.size
    target_ratio = target_w / target_h
    img_ratio = img_w / img_h

    if img_ratio > target_ratio:
        # Image is wider - crop from right side
        new_w = int(img_h * target_ratio)
        left = img_w - new_w  # Align to right
        crop_box = (left, 0, img_w, img_h)
    else:
        # Image is taller - crop from bottom
        new_h = int(img_w / target_ratio)
        top = img_h - new_h  # Align to bottom
        crop_box = (0, top, img_w, img_h)

    cropped = img.crop(crop_box)
    return cropped.resize((target_w, target_h), Image.LANCZOS)


def main():
    print(f"Loading {SOURCE}...")
    img = Image.open(SOURCE)
    print(f"Original size: {img.size}")

    # Desktop version
    desktop = bottom_right_crop(img, *DESKTOP)
    desktop_path = OUTPUT_DIR / "hero-desktop.png"
    desktop.save(desktop_path, optimize=True)
    print(f"Saved {desktop_path} ({DESKTOP[0]}x{DESKTOP[1]})")

    # Mobile version
    mobile = bottom_right_crop(img, *MOBILE)
    mobile_path = OUTPUT_DIR / "hero-mobile.png"
    mobile.save(mobile_path, optimize=True)
    print(f"Saved {mobile_path} ({MOBILE[0]}x{MOBILE[1]})")

    print("Done!")


if __name__ == "__main__":
    main()
