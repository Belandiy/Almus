from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_projects():
    response = client.get("/projects")
    assert response.status_code == 200
    data = response.json()
    assert "projects" in data
    assert isinstance(data["projects"], list)
    assert len(data["projects"]) > 0

def test_chat_invalid_payload():
    # Отправка пустого тела должна возвращать 422 Unprocessable Entity,
    # так как модель Pydantic требует поля messages и profile
    response = client.post("/chat", json={})
    assert response.status_code == 422
