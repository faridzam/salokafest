<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\payment_method;

class paymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $payment_methods =  [

            [
                'name' => "gopay",
                'type' => "gopay",
                'corporate_name' => "Gojek",
            ],
            [
                'name' => "qris",
                'type' => "qris",
                'corporate_name' => "Bank Indonesia",
            ],
            [
                'name' => "alfamart",
                'type' => "cstore",
                'corporate_name' => "Alfamart",
            ],
            [
                'name' => "indomaret",
                'type' => "cstore",
                'corporate_name' => "indomaret",
            ],
            [
                'name' => "transfer bank - bca",
                'type' => "bank_transfer",
                'corporate_name' => "BCA",
            ],
            [
                'name' => "transfer bank - bni",
                'type' => "bank_transfer",
                'corporate_name' => "BNI",
            ],
            [
                'name' => "transfer bank - bri",
                'type' => "bank_transfer",
                'corporate_name' => "BRI",
            ],
            [
                'name' => "transfer bank - mandiri",
                'type' => "echannel",
                'corporate_name' => "Bank Mandiri",
            ],
            [
                'name' => "transfer bank - permata",
                'type' => "bank_transfer",
                'corporate_name' => "Bank Permata",
            ],

        ];

        payment_method::insert($payment_methods);

    }
}
