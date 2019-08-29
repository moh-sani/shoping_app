import 'package:flutter/material.dart';

class WelcomeScreen extends StatefulWidget {
  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome to One Africa Global'),
        centerTitle: true,
      ),
      body: ListView(
        children: <Widget>[
          Image.asset('assets/oafc.png'),
          SizedBox(),
          Text(
              'Live stream of One Africa Music Fest attract a fee of \$0.99 \n If you have paid already. Enter you email to proceed'),
          SizedBox(),
          TextField(
            keyboardType: TextInputType.emailAddress,
          ),
          RaisedButton(
                child: Text('SIGN IN'),
                onPressed: () {},
                color: Colors.blue,
              ),
              Text('If you have never used our streaming services pay one \n time fee to get started.'),
          RaisedButton(
                child: Text('PAY NOW'),
                onPressed: () {},
                color: Colors.blue,
              )
        ],
      ),
    );
  }
}
