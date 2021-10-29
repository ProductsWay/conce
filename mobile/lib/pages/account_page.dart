import 'package:flutter/material.dart';
import 'package:conce_app/pages/user_profile_page.dart';
import 'package:conce_app/pages/wallet_page.dart';
import 'package:conce_app/components/auth_required_state.dart';

class AccountPage extends StatefulWidget {
  const AccountPage({Key? key}) : super(key: key);

  @override
  _AccountPageState createState() => _AccountPageState();
}

class _AccountPageState extends AuthRequiredState<AccountPage> {
  @override
  void onUnauthenticated() {
    Navigator.of(context).pushReplacementNamed('/login');
  }

  @override
  Widget build(BuildContext context) {
    // show 2 tabs: user profile and wallet
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(),
        body: const TabBarView(
          children: [
            UserProfilePage(),
            WalletPage(),
          ],
        ),
        bottomNavigationBar: const TabBar(
          tabs: [
            Tab(
              text: 'Profile',
            ),
            Tab(
              text: 'Wallet',
            ),
          ],
        ),
      ),
    );
  }
}
