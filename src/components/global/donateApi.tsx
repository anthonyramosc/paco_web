import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

// Definimos los tipos para los datos del pago
interface PaymentData {
    amount: number;
    amountWithoutTax?: number;
    amountWithTax?: number;
    tax?: number;
    service?: number;
    tip?: number;
    currency: string;
    reference: string;
    clientTransactionId: string;
    storeId: string;
    additionalData?: string;
    oneTime?: boolean;
    expireIn?: number;
    isAmountEditable?: boolean;
}

// Definimos la respuesta de la API
interface PayphoneResponse {
    id: string;
    clientTransactionId: string;
    url: string;
    reference: string;
    status: string;
}

// Props para nuestro componente
interface PayphonePaymentLinkProps {
    initialAmount?: number;
    storeId: string;
    token: string;
    apiUrl?: string;
    onSuccess?: (response: PayphoneResponse) => void;
    onError?: (error: any) => void;
}

const PayphonePaymentLink = ({
                                 initialAmount = 100,
                                 storeId,
                                 token,
                                 apiUrl = 'https://pay.payphonetodoesposible.com/api/Links',
                                 onSuccess,
                                 onError
                             }: PayphonePaymentLinkProps) => {
    // Estados para manejar nuestro formulario
    const [amount, setAmount] = useState<number>(initialAmount);
    const [amountWithTax, setAmountWithTax] = useState<number>(0);
    const [amountWithoutTax, setAmountWithoutTax] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [reference, setReference] = useState<string>('');
    const [additionalData, setAdditionalData] = useState<string>('');
    const [isAmountEditable, setIsAmountEditable] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<PayphoneResponse | null>(null);
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null);


    const generateUniqueId = () => {
        return `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };


    const calculateTotal = () => {
        const total = amountWithoutTax + amountWithTax + tax;
        setAmount(total);
    };


    const handleAmountWithTaxChange = (value: number) => {
        setAmountWithTax(value);
        calculateTotal();
    };

    const handleAmountWithoutTaxChange = (value: number) => {
        setAmountWithoutTax(value);
        calculateTotal();
    };

    const handleTaxChange = (value: number) => {
        setTax(value);
        calculateTotal();
    };


    const createPaymentLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        setPaymentUrl(null);

        try {

            const paymentData: PaymentData = {
                amount,
                currency: 'USD',
                reference: reference || 'Pago por API Link',
                clientTransactionId: generateUniqueId(),
                storeId,
                isAmountEditable
            };


            if (amountWithTax > 0) paymentData.amountWithTax = amountWithTax;
            if (amountWithoutTax > 0) paymentData.amountWithoutTax = amountWithoutTax;
            if (tax > 0) paymentData.tax = tax;
            if (additionalData) paymentData.additionalData = additionalData;


            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paymentData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el link de pago');
            }

            const data: PayphoneResponse = await response.json();
            setSuccess(data);
            setPaymentUrl(data.url);


            if (onSuccess) onSuccess(data);

        } catch (err: any) {
            setError(err.message || 'Ocurrió un error al procesar tu solicitud');
            if (onError) onError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Crear Link de Pago Payphone
                </h3>
            </div>

            <div className="px-4 py-5 sm:p-6">
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                        <span className="text-sm text-red-700">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm text-green-700">
              ¡Link de pago creado exitosamente!
            </span>
                    </div>
                )}

                <form onSubmit={createPaymentLink}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Monto con impuestos ($)
                            </label>
                            <input
                                type="number"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={amountWithTax}
                                onChange={(e) => handleAmountWithTaxChange(parseFloat(e.target.value) || 0)}
                                step="0.01"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Impuestos ($)
                            </label>
                            <input
                                type="number"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={tax}
                                onChange={(e) => handleTaxChange(parseFloat(e.target.value) || 0)}
                                step="0.01"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Monto sin impuestos ($)
                            </label>
                            <input
                                type="number"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={amountWithoutTax}
                                onChange={(e) => handleAmountWithoutTaxChange(parseFloat(e.target.value) || 0)}
                                step="0.01"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Monto total ($)
                            </label>
                            <input
                                type="number"
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                                value={amount}
                                readOnly
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                La suma de montos e impuestos
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Referencia
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                                placeholder="Ej: Pago de producto X"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Datos adicionales
                            </label>
                            <textarea
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={additionalData}
                                onChange={(e) => setAdditionalData(e.target.value)}
                                placeholder="Información adicional del pago"
                                rows={2}
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                id="isAmountEditable"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={isAmountEditable}
                                onChange={(e) => setIsAmountEditable(e.target.checked)}
                            />
                            <label htmlFor="isAmountEditable" className="ml-2 block text-sm text-gray-700">
                                Permitir al cliente editar el monto
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={loading}
                            style={{backgroundColor:"#785D99"}}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" /> Procesando...
                                </>
                            ) : (
                                'Crear Link de Pago'
                            )}
                        </button>
                    </div>
                </form>

                {paymentUrl && (
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Link de Pago Generado:
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={paymentUrl}
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText(paymentUrl);
                                    alert("¡Link copiado al portapapeles!");
                                }}
                                className="px-4 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300"
                                style={{color:"#785D99"}}
                            >
                                Copiar
                            </button>
                        </div>
                        <a
                            href={paymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white "
                            style={{backgroundColor:"#785D99"}}
                        >
                            Ir al Link de Pago
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PayphonePaymentLink;