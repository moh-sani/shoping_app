import 'package:flutter/material.dart';

class DisplayDatacreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          'Display Data',
          style: TextStyle(
            color: Colors.black,
            letterSpacing: 2.0,
          ),
        ),
        elevation: 15.0,
        leading: IconButton(
          icon: Icon(Icons.home,
          color: Colors.black),
          onPressed: () {},
        ),
      ),
      body: Center(
        child: Text('To be implemented'),
      ),
    );
  }
}
