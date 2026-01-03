import os
import json

def generate_inventory():
    # 1. Setup Paths
    # Get the folder where THIS script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # The folder on your hard drive where tools are
    # This builds the path: ...\Cure's 2026 Inventoery Prospects\images\tools
    tools_dir_abs = os.path.join(script_dir, 'images', 'tools')
    
    # The path used in the HTML (relative)
    web_base = 'images/tools'
    
    print(f"Scanning directory: {tools_dir_abs}")
    
    if not os.path.exists(tools_dir_abs):
        print("ERROR: The 'images/tools' folder does not exist next to this script.")
        return
    
    # Map your folder names to the Category names used in the HTML
    category_map = {
        'learning': 'Learning',
        'repair': 'Repair',
        'prod': 'Productivity'
    }
    
    new_inventory = []
    
    # 2. Scan Categories
    for folder_name, category_label in category_map.items():
        # Physical path: .../images/tools/learning
        cat_path_abs = os.path.join(tools_dir_abs, folder_name)
        
        if not os.path.exists(cat_path_abs):
            print(f"  [Skipping] Category folder not found: {folder_name}")
            continue
            
        print(f"  [Scanning] Category: {folder_name}...")
        
        # Scan items inside category
        items_found = 0
        for item_folder in os.listdir(cat_path_abs):
            item_path_abs = os.path.join(cat_path_abs, item_folder)
            
            if os.path.isdir(item_path_abs):
                items_found += 1
                
                # Extract ID and Name
                parts = item_folder.split(' ', 1)
                product_id = 0
                product_name = item_folder
                
                if len(parts) > 0 and parts[0].isdigit():
                    product_id = int(parts[0])
                    if len(parts) > 1:
                        product_name = parts[1].strip()
                
                # Find Images
                image_paths = []
                valid_exts = ('.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp')
                target_subs = ['main_images', 'variant_images', 'main _images', 'variant _images']
                
                for sub in target_subs:
                    sub_path = os.path.join(item_path_abs, sub)
                    if os.path.exists(sub_path) and os.path.isdir(sub_path):
                        for file in os.listdir(sub_path):
                            if file.lower().endswith(valid_exts):
                                # Web path: images/tools/learning/1 item/main_images/img.jpg
                                web_path = f"{web_base}/{folder_name}/{item_folder}/{sub}/{file}".replace("\\", "/")
                                image_paths.append( web_path )
                                print(f"      + Found image: {sub}/{file}")
                
                if not image_paths:
                    print(f"      ! No images found in: {item_folder}")
                    image_paths.append("https://placehold.co/300x200?text=No+Image")

                # Create Product
                product = {
                    "id": product_id,
                    "name": product_name,
                    "category": category_label,
                    "store": "Local Stock",
                    "basePrice": 0.00,
                    "shipping": 0,
                    "isEssential": False,
                    "essentialRank": 0,
                    "dealTag": "None",
                    "brief": f"Imported from {folder_name}",
                    "description": f"Item imported from folder: {item_folder}",
                    "specs": ["Imported Item"],
                    "images": image_paths
                }
                new_inventory.append(product)

    # 3. Output
    print("\n" + "="*40)
    print("GENERATION COMPLETE")
    print("="*40)
    print(f"Total items generated: {len(new_inventory)}")
    
    # Sort the inventory
    # Order: Learning, Repair, Productivity
    # Then by ID
    cat_order = {'Learning': 0, 'Repair': 1, 'Productivity': 2}
    new_inventory.sort(key=lambda x: (cat_order.get(x['category'], 99), x['id']))

    # Write to file for easier copying
    output_file = os.path.join(script_dir, 'inventory_data.js')
    with open(output_file, 'w') as f:
        f.write(f"const inventory = {json.dumps(new_inventory, indent=4)};")
        
    print(f"Data saved to: {output_file}")
    print("Open that file, copy the code, and paste it into your HTML.")

if __name__ == "__main__":
    generate_inventory()