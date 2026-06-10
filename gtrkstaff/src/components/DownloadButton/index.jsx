import React, { useState } from 'react';

export const DynamicDownload = (props) => {
    //const  params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const downloadFile = async () => {
        setIsLoading(true);
        setError('');

        try {
            // Запрос к API (предполагается, что сервер возвращает файл)
            const response = await fetch(props.url, {
            method: 'GET',
            // headers: { 'Authorization': 'Bearer ...' } // если нужно
        });

        if (!response.ok) {
            throw new Error('Не удалось загрузить файл');
        }

        // Преобразуем ответ в Blob
        const blob = await response.blob();

        // Создаём временную ссылку для скачивания
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Имя файла можно взять из ответа сервера (если доступно)
        link.download = props.filename;

        // Имитируем клик
        document.body.appendChild(link);
        link.click();

        // Очищаем
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

    } catch (err) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={downloadFile}
        disabled={isLoading || props.hidden}
        className="btn btn-success"
      >
        {isLoading ? 'Загрузка...' : 'Скачать отчёт'}
      </button>
    </div>
  );
};
