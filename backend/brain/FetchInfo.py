import requests
from bs4 import BeautifulSoup

def fetch_bird_info(bird_name):
    try:
        url = f"https://en.wikipedia.org/wiki/{bird_name.replace('^[0-9A-Za-z] ', '_')}"
        response = requests.get(url)
        print(response)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        info_paragraphs = soup.find("div", {"class": "mw-body-content"}).find_all("p")
        first_paragraph=""
        
        for p in info_paragraphs:
            if len(p.get_text())>10:
                first_paragraph=p.get_text()
                break
        
        
        image_url = None
        infobox = soup.find("a", {"class": "mw-file-description"})
        if infobox:
            image = infobox.find("img")
            if image:
                image_url = image.get("src")
                if not image_url.startswith("http"):
                    image_url = "https:" + image_url
        
        return first_paragraph, image_url
    except requests.exceptions.RequestException as e:
        print(f"Error fetching bird info: {e}")
        return None, None
    except Exception as e:
        print(f"Error parsing bird info: {e}")
        return None, None