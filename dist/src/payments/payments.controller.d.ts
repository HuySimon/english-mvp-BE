export declare class PaymentsController {
    checkout(body: {
        userId: number;
        teacherId: number;
        package: '5' | '10' | '20';
    }): {
        clientSecret: string;
        amount: number;
        currency: string;
        status: string;
    };
}
