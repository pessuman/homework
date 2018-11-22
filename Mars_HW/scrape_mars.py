import pandas as pd
from bs4 import BeautifulSoup as bs
import requests
from splinter import Browser

def init_browser():
    executable_path = {'executable_path': 'chromedriver.exe'}
    browser = Browser('chrome', **executable_path, headless=False)

Mars_Info = {}

def scrape():
    browser = init_browser()

# dictionary to input data
    Mars_Info = {}

    url = "https://mars.nasa.gov/news/"
    browser.visit(url)

    html = browser.html
    soup = bs(html, 'html.parser')

    results = soup.find("div", class_="list_text")

    # Identify and return latest News Title.
    news_title = results.find("div", class_="content_title").text
        # Identify and return Paragraph Text
    news_p = results.find("div", class_="article_teaser_body").text

# adding data into Mars_Info dictionary
    Mars_Info['news_title'] = news_title
    Mars_Info['news_p'] = news_p


    url2 = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars/"
    browser.visit(url2)

    base_url = 'https://www.jpl.nasa.gov/'
    print(base_url)

    #get image url using BeautifulSoup
    html_image = browser.html
    soup = bs(html_image, "html.parser")
    img_url = soup.find("img", class_="thumb")["src"]
    featured_image_url = base_url + img_url

    Mars_Info['featured_image_url'] = featured_image_url



    url_3 = "https://twitter.com/marswxreport?lang=en/"
    browser.visit(url_3)

    html = browser.html
    soup = bs(html, 'html.parser')


    tweet = soup.find("div", class_="js-tweet-text-container")

        # Identify and return latest News Title.
    mars_weather = tweet.find("p", class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text").text
    print(f'Mars weather: {mars_weather}')

    Mars_Info['mars_weather'] = mars_weather


    url_4 = "https://space-facts.com/mars/"
    tables = pd.read_html(url_4)
    tables

    df = tables[0]
    df.columns = ['Description','value']
    df.set_index('Description', inplace=True)
    data = df.to_html()

    Mars_Info['tables'] = data



    Astrogeology_site = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(Astrogeology_site)

    #
    html = browser.html
    soup = bs(html, 'html.parser')

# Retrieving all items that contain hemisphere information

    hem_info = soup.find_all('div', class_='item')

    #hems = hem_info.find_all('div')

    # empty list to contain dictionary
    hemisphere_image_urls = []

    beginning_img_url = 'https://astrogeology.usgs.gov'

    for hem in hem_info:

        # finding the title for each hemisphere
        title = hem.find('h3').text

        small_img = hem.find('a', class_= 'itemLink product-item')['href']

        browser.visit(beginning_img_url + small_img)

        hem_html = browser.html
        soup = bs(hem_html, 'html.parser')

        # getting original image
        img_url  = beginning_img_url + soup.find('img', class_= 'wide-image')['src']


        hemisphere_image_urls.append({'title':title ,'img_url': img_url})

        Mars_Info['hemisphere_image_urls'] = hemisphere_image_urls

    print(Mars_Info)

    return Mars_Info
