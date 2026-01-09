import json
import re
import os

# Path to the inventory file
file_path = r"c:\Users\IDK\New folder\Cure's 2026 Inventoery Prospects\main_inventory_data.js"

# Desired order of attributes
attribute_order = [
    "id",
    "name",
    "nickname",
    "productStore",
    "variation",
    "basePrice",
    "shipping",
    "dealTag",
    "brief",
    "description",
    "images",
    "productLink",
    "category",
    "isEssential",
    "essentialRank",
    "usage",
    "quantity",
    "source"
]

def reorder_attributes(item):
    new_item = {}
    # Add attributes in the specified order
    for key in attribute_order:
        if key in item:
            new_item[key] = item[key]
    
    # Add any remaining attributes that were not in the list (to avoid data loss)
    for key, value in item.items():
        if key not in new_item:
            new_item[key] = value
            
    return new_item

def main():
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract the array part using regex
        # Matches "const inventory = [" ... "];"
        match = re.search(r'const inventory = (\[.*\]);', content, re.DOTALL)
        
        if not match:
            print("Could not find 'const inventory' array in the file.")
            return

        json_str = match.group(1)
        
        # Remove trailing commas which are valid in JS but invalid in JSON
        json_str = re.sub(r',(\s*[\]}])', r'\1', json_str)

        # Parse the JSON data
        inventory = json.loads(json_str)

        # Reorder attributes for each item
        reordered_inventory = [reorder_attributes(item) for item in inventory]

        # Convert back to JSON string with indentation
        new_json_str = json.dumps(reordered_inventory, indent=4)

        # Reconstruct the file content
        new_content = f"const inventory = {new_json_str};\n\nmodule.exports = {{ inventory }};\n"

        # Write back to the file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"Successfully reordered attributes for {len(reordered_inventory)} items.")

    except json.JSONDecodeError as e:
        print(f"JSON Parse Error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()