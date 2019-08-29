import 'package:flutter/material.dart';

import 'package:flutter_facebook_login/flutter_facebook_login.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase/firebase.dart';
import 'package:firebase_auth/firebase_auth.dart';


class SocialConnectScreen extends StatefulWidget {
  @override
  _SocialConnectState createState() => _SocialConnectState();
}

final FacebookLogin fbLogin = FacebookLogin();

class _SocialConnectState extends State<SocialConnectScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        padding: EdgeInsets.all(32.0),
        children: <Widget>[
          Image.asset('assets/logo.png'),
          SizedBox(
            height: 40,
          ),
          Text('Social Connect'),
          SizedBox(
            height: 40,
          ),
          Text(
              'Please log in with your social account for \n better experience with social features'),
          Row(
            children: <Widget>[
              CircleAvatar(
                child: Image.asset(
                  'assets/face.png',
                  semanticLabel: 'Facebook',
                ),
                radius: 15.0,
              ),
              RaisedButton(
                child: Text('Connect'),
                onPressed: () {
                  fbLogin.logInWithReadPermissions(['email', 'public_profile']).then( (result) {
                    switch (result.status) {
                      case FacebookLoginStatus.loggedIn:
                        FirebaseAuth.instance.signInWithFacebook(
                          accessToken: result.accessToken.token
                        ).then((signedInuser){
                          
                        }).catchError((e){
                          print(e);
                        });
                        break;
                      default:
                    }
                  }).catchError((e){
                    print(e);
                  });
                },
                color: Colors.blue,
                textColor: Colors.white,
              ),
            ],
          ),
          Row(
            children: <Widget>[
              CircleAvatar(
                child: Image.asset(
                  'assets/twi.png',
                  semanticLabel: 'Twitter',
                ),
                radius: 15.0,
              ),
              RaisedButton(
                child: Text('Connect'),
                onPressed: () {},
                color: Colors.lightBlueAccent,
              ),
            ],
          ),
          Row(
            children: <Widget>[
              CircleAvatar(
                child: Image.asset(
                  'assets/insta.png',
                  semanticLabel: 'Intagram',
                ),
                radius: 15.0,
              ),
              RaisedButton(
                child: Text('Connect'),
                onPressed: () {},
                color: Colors.pink,
              ),
            ],
          ),
          RaisedButton(
            child: Text('Skip'),
            onPressed: () {},
          )
        ],
      ),
    );
  }
}
