# flask boilerplate
import flask
import requests
import urllib.parse

app = flask.Flask(__name__)

with open('skeletal/static/inject.js', 'r') as f:
    inject = f.read()

def format(url: str) -> str:
    return 'https://' + url.removeprefix('https://').removesuffix('/') + '/'

@app.route('/')
def index():
    return flask.render_template('index.html')


@app.route('/serve')
def serve():
    url = flask.request.args.get('url')
    request = requests.get(format(url))
    if request.status_code != 200:
        return serve_error(request)
    return request.content

@app.route('/sw.js')
def sw():
    return flask.send_from_directory('static', 'sw.js')

@app.route('/request', methods=['GET', 'POST'])
def resource():
    

    url = format(urllib.parse.parse_qs(urllib.parse.urlparse(flask.request.referrer).query)['url'][0])
    print(url+flask.request.args.get('rec')[1:])
    
    print("\n"*3)
    # print(requests.get(url+flask.request.args.get('rec')[1:]).content)
    
    return requests.get(url+flask.request.args.get('rec')[1:]).content

def serve_error(request: requests.Response):
    return str(request.status_code)

if __name__ == '__main__':
    app.run(debug=True)