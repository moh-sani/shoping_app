import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => new _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    final logo = Hero(
      tag: 'hero',
      child: CircleAvatar(
        backgroundColor: Colors.transparent,
        radius: 48.0,
        child: Image.asset('images/logo.png'),
      ),
    );
    final matricNumber = TextField(
      autofocus: false,
      decoration: InputDecoration(
        prefixIcon: Icon(Icons.person),
          hintText: 'Registeration Number',
          contentPadding: EdgeInsets.fromLTRB(20, 15, 20, 15),
          border:
              OutlineInputBorder(borderRadius: BorderRadius.circular(5.0))),
    );

    final password = TextField(
      controller: TextEditingController(),
      obscureText: true,
      autofocus: false,
      decoration: InputDecoration(
        prefixIcon: Icon(Icons.lock),
          hintText: 'Password',
          contentPadding: EdgeInsets.fromLTRB(20, 15, 20, 15),
          border:
              OutlineInputBorder(borderRadius: BorderRadius.circular(5.0))),
    );

    final loginButton = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: Material(
        borderRadius: BorderRadius.circular(30.0),
        shadowColor: Colors.lightGreenAccent.shade100,
        elevation: 5.0,
        child: RaisedButton(
          //minWidth: 30.0,
          //height: 40.0,
          onPressed: () {},
          color: Colors.green,
          child: Text(
            'Log in',
            style: TextStyle(
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
    final forgotButton = FlatButton(
      child: Text(
        'Forgot password',
        style: TextStyle(
          color: Colors.green,
          fontStyle: FontStyle.italic,
        ),
      ),
      onPressed: () {},
    );
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 32.0, right: 32.0),
          children: <Widget>[
          SizedBox(height: 15.0),
            logo,
            SizedBox(height: 30.0),
            WelcomeNote('Ahmadu Bello University'),
            WelcomeNote('Portal'),
            SizedBox(height: 50.0),
            matricNumber,
            SizedBox(height: 15.0),
            password,
            SizedBox(height: 30.0),
            loginButton,
            forgotButton
          ],
        ),
      ),
    );
  }
}

class WelcomeNote extends StatelessWidget {
  final String text;

  const WelcomeNote(this.text);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: 10.0),
          child: Text(
        text,
        textAlign: TextAlign.center,
        style: TextStyle(
          color: Colors.green,
          fontSize: 42.0,
          fontStyle: FontStyle.normal,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
