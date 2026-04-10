import json
import os

data = [
  {
    "name": "Special Blue de Corlato",
    "birthYear": 2019,
    "category": "Jumpers",
    "imageUrl": "https://primary.jwwb.nl/public/x/u/l/temp-exgfvmevdfqypkiyhati/jumping-horses-high.png",
    "description": "Mare",
    "pedigree": "Zirocco Blue VDL x I'm Special de Muze"
  },
  {
    "name": "Theuwi van het Distelhof",
    "birthYear": 2019,
    "category": "Jumpers",
    "imageUrl": "https://primary.jwwb.nl/public/x/u/l/temp-exgfvmevdfqypkiyhati/theuwi-11-high.jpg",
    "description": "Mare",
    "pedigree": "Emerald x Indoctro"
  },
  {
    "name": "Night Blue de la Roque",
    "birthYear": 2019,
    "category": "Jumpers",
    "imageUrl": "https://primary.jwwb.nl/public/x/u/l/temp-exgfvmevdfqypkiyhati/jumping-horses-high.png",
    "description": "Mare",
    "pedigree": "Chaccoon blue x Odermus R"
  },
  {
    "name": "Stakkazara PS",
    "birthYear": 2019,
    "category": "Jumpers",
    "imageUrl": "https://primary.jwwb.nl/public/x/u/l/temp-exgfvmevdfqypkiyhati/jumping-horses-high.png",
    "description": "Mare",
    "pedigree": "Stakkatol x Balou du Rouet"
  },
  {
    "name": "Doutzen",
    "birthYear": 2020,
    "category": "Jumpers",
    "imageUrl": "https://primary.jwwb.nl/public/x/u/l/temp-exgfvmevdfqypkiyhati/image-high-z73l26.png",
    "description": "Mare",
    "pedigree": "Dominator x Cancare"
  },
  {
    "name": "I'm SO GOOD",
    "birthYear": 2020,
    "category": "Jumpers",
    "imageUrl": "https://primary.jwwb.nl/public/x/u/l/temp-exgfvmevdfqypkiyhati/jumping-horses-high.png",
    "description": "Mare (170cm)",
    "pedigree": "I'm Special de Muze x For Pleasure"
  },
  {
    "name": "United van de Heffinck",
    "birthYear": 2020,
    "category": "Jumpers",
    "imageUrl": "https://primary.jwwb.nl/public/x/u/l/temp-exgfvmevdfqypkiyhati/united-23-high.jpg",
    "description": "Stallion (Approved BWP)",
    "pedigree": "Chacco Bleu x Maquin van de Heffinck"
  },
  {
    "name": "Napoleon",
    "birthYear": 2021,
    "category": "Jumpers",
    "imageUrl": "https://primary.jwwb.nl/public/x/u/l/temp-exgfvmevdfqypkiyhati/napoleon-nixon-x-high.jpg",
    "description": "Stallion, grey",
    "pedigree": "Nixon x Cancara"
  },
  {
    "name": "Warrior",
    "birthYear": 2022,
    "category": "Hunters",
    "imageUrl": "https://primary.jwwb.nl/public/x/u/l/temp-exgfvmevdfqypkiyhati/jumping-horses-high.png",
    "description": "Stallion",
    "pedigree": "Ermitage Kalone x Casall"
  }
]

for idx, horse in enumerate(data):
  safe_name = horse['name'].lower().replace(' ', '-').replace("'", "")
  filename = f"src/content/portfolio/scraped-{idx+1}-{safe_name}.md"
  age = 2026 - horse['birthYear']
  height = "1.70m" if "170" in horse['description'] else "TBD"
  gender = "Stallion" if "Stallion" in horse['description'] else "Mare"
  
  content = f"""---
title: "{horse['name']}"
description: "{horse['pedigree']} - {horse['description']}"
image: "{horse['imageUrl']}"
featured: true
category: "{horse['category']}"
specs:
  age: {age}
  gender: "{gender}"
  height: "{height}"
  level: "Prospect"
---
An incredible prospect from the Maarten Driessen collection. With elite bloodlines (*{horse['pedigree']}*) and exceptional athletic ability, {horse['name']} represents a top-tier investment opportunity in the {horse['category']} category. 
"""
  with open(filename, 'w') as f:
    f.write(content)
