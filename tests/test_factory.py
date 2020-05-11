import os
import tempfile

import pytest
import vagary


@pytest.fixture
def client():
    db_fd, vagary.app.config['DATABASE'] = tempfile.mkstemp()
    vagary.app.config['TESTING'] = True
    client = vagary.app.test_client()
    yield client

def test_main_page(client):
    response = client.get('/hello', follow_redirects=True)
    assert response.status_code == 200