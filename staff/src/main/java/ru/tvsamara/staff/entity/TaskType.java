package ru.tvsamara.staff.entity;

/**
 * тип задачи для рабочего плана
 */

public enum TaskType {
    TZ("ТЗ"),
    RED("РЕД"),
    PR("ПР"),
    ALL("*");
    private String title;
    TaskType(String taskType) {
        this.title = taskType;
    }

    @Override
    public String toString() {
        return this.title.toString();
    }
}
