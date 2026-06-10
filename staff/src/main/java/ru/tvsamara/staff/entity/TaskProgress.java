package ru.tvsamara.staff.entity;

/**
 * таймин задачи для съемок
 */
public enum TaskProgress {
    SHOT("снято"),
    DEVELOP("разработка"),
    DELAY("отложено"),
    CANCELLED("Отменено"),
    MOVE("перенесено");
    private String title;
    TaskProgress(String taskType) {
        this.title = taskType;
    }

    @Override
    public String toString() {
        return this.title.toString();
    }
}
