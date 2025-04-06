import { pipeline } from '@xenova/transformers';

class MyTranslationPipeline {
    static task = 'translation'; // Task remains translation
    static model = 'Xenova/nllb-200-distilled-600M'; // Use NLLB model for translation
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    // Get the translation pipeline instance
    let translator = await MyTranslationPipeline.getInstance((progress) => {
        self.postMessage({ status: 'progress', ...progress });
    });

    console.log('Received data:', event.data);

    // Perform translation
    let output = await translator(event.data.text, {
        tgt_lang: event.data.tgt_lang, // Target language (e.g., 'fra_Latn' for French)
        src_lang: event.data.src_lang, // Source language (e.g., 'eng_Latn' for English)
        callback_function: (x) => {
            self.postMessage({
                status: 'update',
                output: translator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
            });
        }
    });

    console.log('Translation output:', output);

    // Send the final result back to the main thread
    self.postMessage({
        status: 'complete',
        output: output
    });
});