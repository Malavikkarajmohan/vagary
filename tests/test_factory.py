import os
import tempfile
import json
import pytest
import vagary


@pytest.fixture
def client():
    vagary.app.config['TESTING'] = True
    client = vagary.app.test_client()
    yield client

def test_get_urls(client):
    response = client.get('/home', follow_redirects=True)
    assert response.status_code == 200
    response = client.get('/', follow_redirects=True)
    assert response.status_code == 200
    response = client.get('/search', follow_redirects=True)
    assert response.status_code == 200
    response = client.get('/about', follow_redirects=True)
    assert response.status_code == 200
    response = client.get('/packages', follow_redirects=True)
    assert response.status_code == 200
    response = client.get('/top_place', follow_redirects=True)
    assert response.status_code == 200
    response = client.get('/tour_details', follow_redirects=True)
    assert response.status_code == 200
    response = client.get('/contact', follow_redirects=True)
    assert response.status_code == 200
    response = client.get('/success', follow_redirects=True)
    assert response.status_code == 200

def login(client, username, password):
    return client.post('/check_login', data={
        'username': username,
        'pass':password
    }, follow_redirects=True)


def test_login_logout(client):
    """Make sure login and logout works."""

    rv = login(client, 'richa123', 'richa123')
    assert rv.status_code == 200

    rv = login(client, 'richa123x', 'richa123')
    assert rv.status_code == 500

    rv = login(client, 'richa123', 'richa123x')
    assert rv.status_code == 500

def test_recommendations(client):
    rv1 = login(client, 'richa123', 'richa123')
    response1 = client.get('/recommend', data = {'username':'richa123'}, follow_redirects=True)
    assert len(response1.data) != 0
    rv2 = login(client, 'ishaanlagwankar@gmail.com', 'abc123')
    response2 = client.get('/recommend', data = {'username':'ishaanlagwankar@gmail.com'}, follow_redirects=True)
    assert len(response2.data) != 0
    assert response2 != response1

def test_search(client):
    rv1 = login(client, 'richa123', 'richa123')
    response1 = client.post('/search', data = {'place':'Amsterdam'}, follow_redirects=True)
    assert len(response1.data) != 0
    response2 = client.post('/search', data = {'place':'Barcelona'}, follow_redirects=True)
    assert len(response2.data) != 0
    assert response2 != response1

def test_post_urls(client):
    response = client.post('/', data = {'username':'richa123'}, follow_redirects=True)
    assert len(response.data) != 0
    response = client.post('/register', data = {'username':'test', 'pass' : 'test123'}, follow_redirects=True)
    assert len(response.data) != 0
    response = client.post('/check_login', data = {'username':'richa123', 'pass' : 'richa123'}, follow_redirects=True)
    assert len(response.data) != 0

def test_error_urls(client):
    response = client.post('/home', follow_redirects=True)
    assert response.status_code != 200
    response = client.post('/about', follow_redirects=True)
    assert response.status_code != 200
    response = client.post('/packages', follow_redirects=True)
    assert response.status_code != 200
    response = client.post('/top_place', follow_redirects=True)
    assert response.status_code != 200
    response = client.post('/tour_details', follow_redirects=True)
    assert response.status_code != 200
    response = client.post('/contact', follow_redirects=True)
    assert response.status_code != 200
    response = client.post('/success', follow_redirects=True)
    assert response.status_code != 200

def test_booking(client):
    rv = login(client, 'richa123', 'richa123')
    content = {'country':'Amsterdam', 'name':'richa123', 'persons':'4'}
    response1 = client.post('/success', json = content, follow_redirects=True)
    assert TypeError