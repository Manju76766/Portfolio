import os
from PIL import Image

def crop_whitespace(image_path):
    print(f"Opening image: {image_path}")
    if not os.path.exists(image_path):
        print("Error: File does not exist.")
        return
        
    img = Image.open(image_path)
    img = img.convert("RGBA")
    
    bbox = img.getbbox()
    if bbox:
        print(f"Original size: {img.size}, Bounding box: {bbox}")
        cropped_img = img.crop(bbox)
        print(f"Cropped size: {cropped_img.size}")
        
        # Save cropped image
        cropped_img.save(image_path, "PNG")
        print("Cropped image saved successfully!")
    else:
        print("Error: Image seems to be fully transparent.")

if __name__ == "__main__":
    logo_path = os.path.join("src", "img", "logo.png")
    crop_whitespace(logo_path)
