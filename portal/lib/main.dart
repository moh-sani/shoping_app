import 'package:flutter/material.dart';

import 'login_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  static const String _title = 'ABUR';
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      theme: ThemeData(
        primaryColor: Colors.green,
        primarySwatch: Colors.blue,
      ),
      home: LoginScreen(),
    );
  }
}
