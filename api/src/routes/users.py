import cloudinary
import cloudinary.uploader

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User

bpUsers = Blueprint('bpUsers', __name__)

@bpUsers.route('/users', methods=['GET'])
def list_users():
    return jsonify([]), 200


@bpUsers.route('/users/profile', methods=['GET'])
@jwt_required()
def user_profile():

    username = get_jwt_identity()
    currentUser = User.query.filter_by(username=username).first()


    return jsonify(currentUser.serialize()), 200



@bpUsers.route('/users/profile/avatar', methods=['PUT'])
@jwt_required()
def user_profile_avatar():

    username = get_jwt_identity()
    currentUser = User.query.filter_by(username=username).first()

    if not 'avatar' in request.files: return jsonify({ "status": "failed", "code": 400, "msg": "Avatar is required"}), 400
    avatar = request.files['avatar']
    instagram = request.form['instagram']

    resp = cloudinary.uploader.upload(avatar, folder="avatars")

    if not resp['secure_url']: return jsonify({ "status": "failed", "code": 400, "msg": "Error uploading avatar, please try again."}), 400

    currentUser.avatar = resp['secure_url']
    if instagram: currentUser.instagram = instagram
    #currentUser.instagram = instagram if instagram else currentUser.instagram
    currentUser.update()

    return jsonify(currentUser.serialize()), 200


@bpUsers.route('/users/profile/cv', methods=['PUT'])
@jwt_required()
def user_profile_cv():

    username = get_jwt_identity()
    currentUser = User.query.filter_by(username=username).first()

    if not 'cv' in request.files: return jsonify({ "status": "failed", "code": 400, "msg": "CV is required"}), 400
    cv = request.files['cv']

    resp = cloudinary.uploader.upload(cv, folder="cv")

    if not resp['secure_url']: return jsonify({ "status": "failed", "code": 400, "msg": "Error uploading cv, please try again."}), 400

    currentUser.cv = resp['secure_url']
    currentUser.update()

    return jsonify(currentUser.serialize()), 200