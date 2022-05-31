from .database import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    avatar = db.Column(db.String(200), default="")
    cv = db.Column(db.String(200), default="")
    instagram = db.Column(db.String(200), default="")

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "avatar": self.avatar,
            "cv": self.cv,
            "instagram": self.instagram
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()