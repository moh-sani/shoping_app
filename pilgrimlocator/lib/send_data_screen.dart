import 'package:flutter/material.dart';

class SendDataScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          'Send Data',
          style: TextStyle(
            color: Colors.black,
            letterSpacing: 2.0,
          ),
        ),
        titleSpacing: 5.0,
        elevation: 15.0,
        leading: IconButton(
          icon: Icon(Icons.home, color: Colors.black),
          onPressed: () {},
        ),
      ),
      body: Center(
        child: Text('To be implemented'),
      ),
    );
  }
}
