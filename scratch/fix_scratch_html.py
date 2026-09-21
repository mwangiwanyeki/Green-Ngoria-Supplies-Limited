import glob

for path in glob.glob("scratch/*.html"):
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Replace <html> with <html lang="en">
    if "<html" in content and "lang=" not in content:
        content = content.replace("<html>", '<html lang="en">').replace("<HTML>", '<html lang="en">')

    # Ensure <head> has viewport, charset, and title
    if "<head>" in content:
        tags = []
        lower_head = content[:1500].lower()
        if "charset" not in lower_head:
            tags.append('    <meta charset="utf-8" />')
        if "viewport" not in lower_head:
            tags.append('    <meta name="viewport" content="width=device-width, initial-scale=1" />')
        if "<title>" not in lower_head:
            tags.append("    <title>Scratch Inspection</title>")
        if tags:
            content = content.replace("<head>", "<head>\n" + "\n".join(tags))

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("All scratch HTML files updated successfully.")
