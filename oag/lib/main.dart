import 'package:flutter/material.dart';

import './screens/news_letter.dart';

void main() => runApp(OAGApp());

class OAGApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'One Africa Global',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: NewsLetterScreen(),
    );
  }
}

