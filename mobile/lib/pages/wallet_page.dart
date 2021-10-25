import 'package:flutter/material.dart';
import 'package:supabase/supabase.dart';
import 'package:conce_app/components/auth_required_state.dart';
import 'package:conce_app/utils/constants.dart';

class WalletPage extends StatefulWidget {
  const WalletPage({Key? key}) : super(key: key);

  @override
  _WalletPageState createState() => _WalletPageState();
}

class _WalletPageState extends AuthRequiredState<WalletPage> {
  String? _address;
  var _loading = false;

  /// Called once a user id is received within `onAuthenticated()`
  Future<void> _getWallet(String userId) async {
    setState(() {
      _loading = true;
    });
    final response = await supabase
        .from('wallets')
        .select()
        .eq('profile_id', userId)
        .single()
        .execute();
    final error = response.error;
    if (error != null && response.status != 406) {
      context.showErrorSnackBar(message: error.message);
    }
    final data = response.data;
    if (data != null) {
      _address = (data['address'] ?? '') as String;
    }
    setState(() {
      _loading = false;
    });
  }

  @override
  void onAuthenticated(Session session) {
    final user = session.user;
    if (user != null) {
      _getWallet(user.id);
    }
  }

  @override
  void onUnauthenticated() {
    Navigator.of(context).pushReplacementNamed('/login');
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
        padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 12),
        children: [
          // showl loading text or wallet address
          if (_loading)
            const Text('Loading...')
          else if (_address == null)
            const Text('No wallet address found')
          else
            Text(
              'Wallet address: $_address',
              style: Theme.of(context).textTheme.headline6,
            ),
          const SizedBox(height: 18),
        ]);
  }
}
