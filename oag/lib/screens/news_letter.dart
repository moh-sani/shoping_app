import 'package:flutter/material.dart';

//font awesome
import 'package:font_awesome_flutter/font_awesome_flutter.dart';


class NewsLetterScreen extends StatefulWidget {
  @override
  _NewsLetterState createState() => _NewsLetterState();
}

class _NewsLetterState extends State<NewsLetterScreen> {
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
          Text(
              'Sign up and be the first to know about the latest \n news in the One Africa Space!'),
          TextField(),
          Row(
            children: <Widget>[
              RaisedButton(
                child: Text('Submit'),
                onPressed: () {},
              ),
              RaisedButton(
                child: Text('Submit'),
                onPressed: () {},
              ),
            ],
          )
        ],
      ),
    );
  }
}
