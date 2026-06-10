package ru.tvsamara.staff.entity;

/**
 * тип персонала для задачи на TV или радио
 */

public enum OillType {
    AKI92("АИ-92"),
    AKI95("АИ-95"),
    DT("ДТ");
    private String title;

    OillType(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return title.toString();
    }
}
